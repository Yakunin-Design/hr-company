import { NextFunction, Request, response, Response } from 'express';
import db from '../lib/idb';
import jwt from 'jsonwebtoken';

import IJobOffer from '../interfaces/IJobOffer';
import { ObjectId } from 'mongodb';

function profile(req: Request, res: Response): void {
    res.status(200).send(res.locals.user);
}

async function basic_edit(req: Request, res: Response): Promise<void> {
    try {
        const data = req.body;

        const changed_names: Array<string> = Object.keys(data);
        const changed_values: Array<string | object | Array<string>> =
            Object.values(data);

        const allowed_edits = ['full_name', 'description', 'logo', 'company'];

        let edits = {};
        for (let i = 0; i < changed_names.length; i++) {
            if (
                allowed_edits.indexOf(changed_names[i]) === -1 ||
                changed_values[i] === ''
            ) {
                res.status(400).send('Invalid data');
                return;
            }
            edits[changed_names[i]] = changed_values[i];
        }

        await db.update(res.locals.user, { $set: { ...edits } }, 'employers');

        res.status(200).send('Updated');
    } catch (e) {
        console.log('[EDIT]', e);
    }
}

function val_job_offer(data: any) {
    // magic validation
    if (!data.specialty || !data.type) {
        return { Ok: null, Err: new Error('empty data fields') };
    }

    return { Ok: data };
}

async function create_job_offer(req: Request, res: Response): Promise<void> {
    try {
        // parse the data [400]
        const data = req.body;

        // validate it [400]
        const validated = val_job_offer(data);

        if (validated.Err) {
            res.status(400).send(validated.Err.message);
            return;
        }

        let job_offer: IJobOffer = {
            ...validated.Ok!,
            employer_id: res.locals.user._id,
            status: 'active',
            candidates: [],
            candidate_count: 0,
            created: Math.floor(Date.now() / 1000),
        };

        if (!job_offer.point_id) {
            // db.save new point
            const point = await db.save(
                {
                    address: job_offer.address,
                    subway: job_offer.subway,
                    emp_id: res.locals.user._id,
                    job_offers: [],
                    workers: [],
                },
                'points'
            );

            const employer_points = res.locals.user.points
                ? [...res.locals.user.points, point.Ok!]
                : [point.Ok!];

            const update_employer = await db.update(
                { _id: res.locals.user._id },
                { $set: { points: employer_points } },
                'employers'
            );

            job_offer.address && delete job_offer.address;
            job_offer.subway && delete job_offer.subway;
            job_offer['point_id'] = point.Ok!.toString();
        }

        // creating the JO in the database [500]
        const db_result = await db.save(job_offer, 'job_offers');

        if (db_result.Err) {
            res.status(500).send(db_result.Err.message);
            return;
        }

        const point = await db.find(
            { _id: new ObjectId(job_offer.point_id) },
            'points'
        );

        const offers = point.Ok!.job_offers;

        const update_point = await db.update(
            { _id: new ObjectId(job_offer.point_id) },
            { $set: { job_offers: [...offers, db_result.Ok!] } },
            'points'
        );

        // sending the response [201]
        res.status(201).send('Created');
    } catch (e) {
        console.log(e.message);
    }
}

async function job_offers(req: Request, res: Response) {
    try {
        // find all job offers (with employer_id from jwt)
        const employer_id = res.locals.user._id;
        const points_id = res.locals.user.points
            ? res.locals.user.points.map(point => {
                  return { _id: point };
              })
            : [];

        let points;
        if (points_id.length > 0) {
            const points_result = await db.find_all(
                { $or: [...points_id] },
                'points'
            );

            points = points_result.Ok ? points_result.Ok : [];
        } else {
            points = [];
        }

        const db_result = await db.find_all(
            { employer_id: employer_id },
            'job_offers'
        );

        if (db_result.Err) return res.status(500).send(db_result.Err.message);

        const min_job_offers = db_result.Ok!.map(jo => {
            const point = points.filter(
                point => point._id.toString() === jo.point_id.toString()
            );

            return {
                id: jo._id,
                specialty: jo.specialty,
                address: point[0].address,
                subway: point[0].subway,

                candidate_count: jo.candidate_count,
                created: jo.created,
                status: jo.status,

                salary: jo.salary,
                schedule: jo.schedule,
                working_time: jo.working_time,
                employer_id: employer_id,
            };
        });

        // send the response [200]
        res.status(200).send({ points: points, job_offers: min_job_offers });
    } catch (e) {
        console.log(e.message);
    }
}

async function full_job_offer(req: Request, res: Response) {
    try {
        // get job offer by id form the database
        if (req.params.id.length != 24)
            return res.status(400).send('wrong id!');

        const job_id = new ObjectId(req.params.id);
        const db_result = await db.find({ _id: job_id }, 'job_offers');

        if (db_result.Err) return res.status(500).send(db_result.Err.message);
        if (db_result.Ok === null)
            return res.status(404).send('Job offer doest not exist');

        // if (req.headers.authorization) {

        // send the response [200]

        let response = {
            data: { ...db_result.Ok },
            // contains: contains
        };

        const point_id = new ObjectId(response.data.point_id);
        const point = await db.find({ _id: point_id }, 'points');

        if (point.Err || point.Ok === null)
            return res.status(400).send('db error [employer controller]');

        response.data.address = point.Ok.address;
        response.data.subway = point.Ok.subway;

        delete response.data.point_id;

        res.status(200).send(response);
    } catch (e) {
        console.log(e.message);
    }
}

async function get_worker_bank(req: Request, res: Response) {
    try {
        // find all job offers (with employer_id from jwt)
        const employer_id = res.locals.user._id;
        const points_id = res.locals.user.points
            ? res.locals.user.points.map(point => {
                  return { _id: point };
              })
            : [];

        let points;
        if (points_id.length > 0) {
            const points_result = await db.find_all(
                { $or: [...points_id] },
                'points'
            );

            points = points_result.Ok ? points_result.Ok : [];
        } else {
            points = [];
        }

        const db_result = await db.find_all(
            { employer_id: employer_id },
            'job_offers'
        );

        if (db_result.Err) return res.status(500).send(db_result.Err.message);

        const candidates: string[] = [];

        const job_offers = db_result.Ok!.map(jo => {
            jo.candidates.forEach(candidate => {
                if (!candidates.includes(candidate.toString()))
                    candidates.push(candidate.toString());
            });
        });

        // [id, id, id] -> [{}, {}, {}]
        const workers = await Promise.all(
            candidates.map(async candidate => {
                const db_result = await db.find(
                    { _id: new ObjectId(candidate) },
                    'workers'
                );

                return db_result.Ok;
            })
        );

        // send the response [200]
        res.status(200).send(workers);
    } catch (e) {
        console.log(e.message);
    }
}

async function get_candidates(req: Request, res: Response) {
    try {
        const candidates = req.body;

        const workers = await Promise.all(
            candidates.map(async candidate => {
                const db_result = await db.find(
                    { _id: new ObjectId(candidate) },
                    'workers'
                );

                return db_result.Ok;
            })
        );

        res.status(200).send(workers);
    } catch (e) {
        console.log(e);
    }
}

async function get_workers(req: Request, res: Response) {
    try {
        const workers = req.body;

        const workers_list = await Promise.all(
            workers.map(async worker => {
                const db_result = await db.find(
                    { _id: new ObjectId(worker) },
                    'workers'
                );

                return db_result.Ok;
            })
        );

        res.status(200).send(workers_list);
    } catch (e) {
        console.log(e);
    }
}

async function get_point_data(req: Request, res: Response) {
    try {
        const { job_offer_ids } = req.body;

        const filter = job_offer_ids.map(jo => {
            return {
                _id: new ObjectId(jo),
            };
        });

        const response_data = await db.find_all(
            { $or: [...filter] },
            'job_offers'
        );

        res.status(200).send(response_data.Ok);
    } catch (e) {
        console.log(e);
    }
}

async function edit_job_offer(req: Request, res: Response) {
    try {
        let changes = { ...req.body.changes };

        const job_offer = await db.find(
            { _id: new ObjectId(req.body.id) },
            'job_offers'
        );

        if (job_offer.Err) return res.status(400).send('Job offer not found');

        if (
            res.locals.user._id.toString() !=
            job_offer.Ok!.employer_id.toString()
        )
            return res.status(400).send('not your jo');

        if (changes.address || changes.subway) {
            if (changes.address) {
                //create new point

                const point = await db.save(
                    {
                        address: changes.address,
                        subway: changes.subway,
                        emp_id: res.locals.user._id,
                        job_offers: [new ObjectId(req.body.id)],
                        workers: [],
                    },
                    'points'
                );
                const employer_points = res.locals.user.points
                    ? [...res.locals.user.points, point.Ok!]
                    : [point.Ok!];

                const update_employer = await db.update(
                    { _id: res.locals.user._id },
                    { $set: { points: employer_points } },
                    'employers'
                );

                changes.point_id = point.Ok!;

                // delete jo from old point
                await delete_jo_from_point(
                    job_offer.Ok!.point_id,
                    new ObjectId(req.body.id)
                );
            } else {
                const point = await db.update(
                    { _id: new ObjectId(job_offer.Ok!.point_id) },
                    { $set: { subway: changes.subway } },
                    'points'
                );
            }
            delete changes.address && changes.address;
            delete changes.subway;
        }

        const db_result = await db.update(
            { _id: job_offer.Ok!._id },
            { $set: { ...changes } },
            'job_offers'
        );

        if (db_result.Err) return res.status(400).send('update err');

        res.status(200).send('updated');
    } catch (e) {
        console.log(e);
    }
}

async function activate_job_offer(req: Request, res: Response) {
    try {
        const id = req.body.id;
        const new_timer = Math.round(Date.now() / 1000);

        const db_result = await db.update(
            { _id: new ObjectId(id) },
            { $set: { status: 'active', created: new_timer } },
            'job_offers'
        );

        if (db_result.Err) return res.status(400).send('update err');

        res.status(200).send('job offer was activated');
    } catch (e) {
        console.log(e);
    }
}

async function close_job_offer(req: Request, res: Response) {
    try {
        const req_id = req.body.id;

        const job_offer = await db.find(
            { _id: new ObjectId(req_id) },
            'job_offers'
        );

        if (job_offer.Err) {
            return res.status(400).send('error: wrong id');
        }

        if (
            job_offer.Ok!.employer_id.toString() !=
            res.locals.user._id.toString()
        ) {
            return res.status(400).send('not your job offer');
        }

        const job_offer_update = await db.update(
            { _id: job_offer.Ok!._id },
            { $set: { status: 'disabled' } },
            'job_offers'
        );

        if (job_offer_update.Err) {
            return res.status(400).send('error: status update');
        }

        job_offer.Ok!.candidates &&
            job_offer.Ok!.candidates.forEach(async candidate => {
                const worker = await db.find({ _id: candidate }, 'workers');

                if (worker.Err) {
                    return res.status(400).send('error: worker find err');
                }

                const new_responds = worker.Ok!.responds.filter(
                    respond => respond.toString() != req_id.toString()
                );

                const update_worker = await db.update(
                    { _id: candidate },
                    { $set: { responds: new_responds } },
                    'workers'
                );

                if (update_worker.Err) {
                    return res.status(400).send('error: worker update err');
                }
            });

        return res.status(200).send('closed successfully');
    } catch (err) {
        console.log(err);
    }
}

async function delete_jo_from_point(point_id, job_offer_id) {
    const point = await db.find({ _id: new ObjectId(point_id) }, 'points');

    console.log(point_id);

    const new_jos = point.Ok!.job_offers.filter(jo => {
        return jo.toString() !== job_offer_id.toString();
    });

    const db_result = await db.update(
        { _id: point.Ok!._id },
        { $set: { job_offers: new_jos } },
        'points'
    );
}

async function create_point(req: Request, res: Response) {
    const find = await db.find(
        { ...req.body, emp_id: res.locals.user._id },
        'points'
    );

    if (find.Ok) return res.status(400).send('already exists');

    const point_data = {
        address: req.body.address,
        subway: req.body.subway,
        emp_id: res.locals.user._id,
        job_offers: [],
        workers: [],
    };

    const point_result = await db.save(point_data, 'points');

    if (point_result.Err) return res.status(400).send('update err');

    const points = res.locals.user.points
        ? [...res.locals.user.points, point_result.Ok]
        : [point_result.Ok];

    const emp_result = await db.update(
        { _id: res.locals.user._id },
        { $set: { points: points } },
        'employers'
    );

    if (emp_result.Err) return res.status(400).send('update err');

    res.status(200).send('ok');
}

async function delete_point(req: Request, res: Response) {
    const { user } = res.locals;

    const find = await db.find({ _id: new ObjectId(req.body.id) }, 'points');

    if (find.Err) return res.status(400).send('wrong id');
    if (find.Ok!.emp_id.toString() != user._id.toString())
        return res.status(400).send('not your point');

    const new_points = user.points.filter(point => {
        return point.toString() != req.body.id;
    });

    const delete_from_employer = await db.update(
        { _id: user._id },
        { $set: { points: [...new_points] } },
        'employers'
    );
    const delete_jo_from_point = await db.delete(req.body.id, 'points');

    res.status(200).send('Updated');
}

async function get_points(req: Request, res: Response) {
    const points_id = res.locals.user.points
        ? res.locals.user.points.map(point => {
              return { _id: point };
          })
        : [];

    if (points_id.length === 0) {
        res.status(200).send([]);
        return;
    }

    console.log(points_id);

    const db_result = await db.find_all({ $or: [...points_id] }, 'points');

    if (db_result.Err) return res.status(400).send('find err');

    // const db_result = await db.find_all({})

    res.status(200).send(db_result.Ok);
}

async function accept_worker(req: Request, res: Response) {

    try {
        const {jo_id, worker_id} = req.body;

        const job_offer = await db.find(
            { _id: new ObjectId(jo_id) },
            'job_offers'
        );

        if (job_offer.Err) {
            return res.status(400).send('error: wrong jo id');
        }

        if (
            job_offer.Ok!.employer_id.toString() !=
            res.locals.user._id.toString()
        ) {
            return res.status(400).send('not your job offer');
        }


        const worker = await db.find(
            { _id: new ObjectId(worker_id) },
            'workers'
        );
        if (worker.Err) {
            return res.status(400).send('error: wrong worker id');
        }
        if (
            job_offer.Ok!.candidates.filter(candidate => {return candidate.toString() == worker_id.toString()}) == []
        ) { return res.status(400).send('error: candidate not found'); }
        

        const new_candidates = job_offer.Ok!.candidates.filter(candidate => {return candidate.toString() != worker_id.toString()});
        const new_workers = job_offer.Ok!.workers ? [...job_offer.Ok!.workers, new ObjectId(worker_id)] : [new ObjectId(worker_id)];
        const new_workers_count = job_offer.Ok!.workers_count ? job_offer.Ok!.workers_count + 1 : 1;

        const jo_update_data = {
            candidates: new_candidates,
            candidate_count: job_offer.Ok!.candidate_count - 1,
            workers: new_workers,
            workers_count: new_workers_count
        }
        const jo_update = await db.update({_id: new ObjectId(jo_id)}, {$set: {...jo_update_data}}, 'job_offers');


        const work = worker.Ok!.work ? [...worker.Ok!.work, new ObjectId(jo_id)] : [new ObjectId(jo_id)];
        const new_responds = worker.Ok!.responds.filter(resp => {return resp.toString() != jo_id.toString()})
        const worker_update_data = {
            work,
            responds: new_responds,
        }
        const worker_update = await db.update({_id: new ObjectId(worker_id)}, {$set: {...worker_update_data }}, 'workers');

        return res.status(200).send('accepted successfully');
    } catch (err) {
        console.log(err);
    }
}

export default {
    profile,
    basic_edit,
    create_job_offer,
    job_offers,
    full_job_offer,
    edit_job_offer,
    close_job_offer,
    activate_job_offer,
    create_point,
    delete_point,
    get_points,
    get_candidates,
    get_workers,
    get_worker_bank,
    get_point_data,
    accept_worker,
};
