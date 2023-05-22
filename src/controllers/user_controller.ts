import { Request, Response } from 'express';
import Result from '../lib/Result';
import validator from '../lib/validator';
import { generate_code, send_sms, send_email } from '../lib/codes';
import db from '../lib/idb';
import { ObjectId } from 'mongodb';

// Email / Phone
async function email_phone_edit_step1(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Parse data
        const { type, new_value } = req.body;

        // Validation
        let validate: Result<boolean>;
        let old_value: string;

        if (type === 'phone') {
            validate = validator.phone(new_value);
            old_value = res.locals.user.phone;
        } else {
            validate = validator.email(new_value);
            old_value = res.locals.user.mail;
        }

        if (!validate.Ok) {
            res.status(400).send('Invalid input');
            return;
        }

        // Generate code
        const code = generate_code();

        // Unique save to db

        const filter = { _id: res.locals.user._id };

        const unverified_edit = {
            _id: res.locals.user._id,
            new_value,
            code,
            time: Date.now(),
            type,
        };

        const result = await db.save_unique(
            filter,
            unverified_edit,
            'unverified_edits'
        );
        if (!result.Ok) {
            res.status(400).send('Wrong');
            return;
        }

        // Send code
        if (type === 'phone') {
            send_sms(res.locals.user.phone, `Your code: ${code}`);
        } else {
            send_email(res.locals.user.email, `Your code: ${code}`);
        }

        res.status(203).send(result.Ok.toString());
    } catch (e) {
        console.log('big OOOF [confirm_phone] --> ' + e);
        res.status(500).send('Something went wrong');
    }
}

async function email_phone_edit_step2(
    req: Request,
    res: Response
): Promise<void> {
    const { code } = req.body;
    const id = res.locals.user._id;

    // Finding edit
    const unverified_edit = await db.find({ _id: id }, 'unverified_edits');
    if (unverified_edit.Ok === null) {
        res.status(400).send('Invalid data');
        return;
    }

    // Checking code
    if (unverified_edit.Ok.code != code) {
        res.status(400).send('Invalid code');
        return;
    }

    const collection = res.locals.jwt.user_type + 's';
    await db.update(
        { _id: id },
        { $set: { [unverified_edit.Ok.type]: unverified_edit.Ok.new_value } },
        collection
    );

    await db.delete(id, 'unverified_edits');

    res.status(203).send('ok');
}

async function get_jobs(req: Request, res: Response) {
    const db_result = await db.find_all({ status: 'active' }, 'job_offers');

    // No job offers || db error
    if (db_result.Err) return res.status(400).send(db_result.Err.message);
    if (db_result.Ok === null) return res.status(200).send([]);

    const bubbles = db_result.Ok.map(jo => jo.specialty);

    // Address & subway are stored in the point collection
    const resp = await Promise.all(
        db_result.Ok.map(async job => {
            const point = await db.find(
                { _id: new ObjectId(job.point_id) },
                'points'
            );
            if (point.Ok === null || point.Err)
                return console.log('cant find point');
            
            
            // Removing useless data from beeing send to the client
            delete job.experience;
            delete job.citizenship;
            delete job.sex;
            delete job.age;
            delete job.candidates;
            delete job.point_id;

            const employer = await db.find(
                { _id: new ObjectId(job.employer_id) },
                'employers'
            );
            if (employer.Ok === null || employer.Err)
                return console.log('cant find employer');

            delete job.employer_id;
            return {
                ...job,
                address: point.Ok.address,
                subway: point.Ok.subway,
                company: employer.Ok.company,
            };
        })
    );

    res.status(200).send({bubbles, jo: resp});
}

async function find_jobs(req: Request, res: Response) {

    const specialty_filter = req.body;
    const specialty = {$regex: `${specialty_filter.string.trim()}`, $options: 'i'}
    const filters = specialty_filter.string === '' ? { status: 'active'} : { status: 'active', specialty, ...specialty_filter.filters }

    const db_result = await db.find_all(
        filters,
        'job_offers',
    );

    // No job offers || db error
    if (db_result.Err) return res.status(400).send(db_result.Err.message);
    if (db_result.Ok === null) return res.status(200).send([]);

    // Address & subway are stored in the point collection
    const resp = await Promise.all(
        db_result.Ok.map(async job => {
            const point = await db.find(
                { _id: new ObjectId(job.point_id) },
                'points'
            );
            if (point.Ok === null || point.Err)
                return console.log('cant find point');
            
            
            // Removing useless data from beeing send to the client
            delete job.experience;
            delete job.citizenship;
            delete job.sex;
            delete job.age;
            delete job.candidates;
            delete job.point_id;

            const employer = await db.find(
                { _id: new ObjectId(job.employer_id) },
                'employers'
            );
            if (employer.Ok === null || employer.Err)
                return console.log('cant find employer');

            delete job.employer_id;
            return {
                ...job,
                address: point.Ok.address,
                subway: point.Ok.subway,
                company: employer.Ok.company,
            };
        })
    );

    // console.log(resp);

    res.status(200).send(resp);
}

async function get_workers(req: Request, res: Response): Promise<void> {
    const db_result = await db.find_all({}, 'workers');

    if (db_result.Err) {
        res.status(400).send(db_result.Err.message);
        return;
    }
    const specialty = [];
    db_result.Ok!.map(worker => {
        //@ts-ignore
        worker.specialty.map(spec => {
            //@ts-ignore
            !specialty.includes(spec) && specialty.push(spec);
        });
    })
    const bubbles = [...specialty,...db_result.Ok!.map(worker => worker.full_name)];

    const workers = db_result.Ok!.map(worker => {
        return {
            _id: worker._id,
            full_name: worker.full_name,
		    specialty: worker.specialty,
		    is_ready: worker.status === "ready" ? true : false,
            logo: worker.logo || "none"
        }
    })

    res.status(200).send({bubbles, workers});
}

async function find_workers(req: Request, res: Response): Promise<void> {

    const webapp_filters = req.body;
    const selector = {$regex: `${webapp_filters.string.trim()}`, $options: 'i'};
    const filter = webapp_filters.string.trim() != "" ? {$or:[{full_name: selector},{specialty: selector}], ...webapp_filters.filters} : {}
    const db_result = await db.find_all(filter, 'workers');

    if (db_result.Err) {
        res.status(400).send(db_result.Err.message);
        return;
    }

    const workers = db_result.Ok!.map(worker => {
        return {
            _id: worker._id,
            full_name: worker.full_name,
		    specialty: worker.specialty,
		    is_ready: worker.status === "ready" ? true : false,
            logo: worker.logo || "none"
        }
    })

    res.status(200).send(workers);
}

async function get_user(req: Request, res: Response): Promise<void> {
    res.status(200).send({
        user_type: res.locals.jwt.user_type,
        id: res.locals.user._id,
    });
}

async function get_worker_by_id(req: Request, res: Response) {
	try {
		const id = req.params.id;	
		const filter = {_id: new ObjectId(id)}

		const db_result = await db.find(filter, "workers");

		if(db_result.Err)
			return res.status(500).send("FAIL: Cant find worker by id");

		if (db_result.Ok === null) 
			return res.status(404).send("worker with id: " + id + " was not found.");

		let worker = {
			...db_result.Ok
		}

		delete worker.password;
		delete worker.phone;

		res.status(200).send(worker);
	}
	catch(e) {
		console.log("[ ERROR ]: Get worker by id fn failed with error: ");
		console.log(e);
		res.status(400).send("wrong id");
	}
}

async function get_rewiews(req: Request, res: Response) {
    try {
        const rewiews = res.locals.user.rewiews || [];
        let res_rew = [];
        if (rewiews.length > 0) {

            const user_type = res.locals.jwt.user_type === 'worker' ? 'employers' : 'workers'

            res_rew = rewiews.map(async rewiew => {

                const sender = await db.find({ _id: new ObjectId(rewiew.sender_id), user_type});
                if (sender.Err) {
                    res.status(400).send(sender.Err.message);
                }

                const sender_logo = sender.Ok!.logo;
                const sender_name = user_type === 'workers' ? sender.Ok!.full_name : sender.Ok!.company;

                const res_rewiew = {
                    ...rewiew,
                    sender_logo,
                    sender_name
                }
                delete res_rewiew.sender_id;

                return res_rewiew 
            })
        }

        res.status(200).send(res_rew);

    } catch (err) {
        console.error(err);
    }
}

async function send_rewiew(req: Request, res: Response) {
    try {
        const {user_id, categories, text} = req.body;

        const user_type = res.locals.jwt.user_type === 'worker' ? 'employers' : 'workers'
        const user = await db.find({_id: new ObjectId(user_id)}, user_type);

        if (user.Err) {
            res.status(300).send("Err: Wrong id");
            return;
        }

        const old_rewiews = user.Ok!.rewiews || [];

        const new_rewiew = {
            time: Math.floor(Date.now() / 1000),
            sender_id: new ObjectId(res.locals.jwt.user_id),
            categories,
            text,
            total : 0
        }

        let total = 0;
        for (let key in categories) {
            total += categories[key];
        }
        total = total / Object.keys(categories).length;

        new_rewiew.total = total

        const update = await db.update({_id: new ObjectId(user_id)}, {$set: {rewiews: [...old_rewiews, new_rewiew]}}, user_type)

        if (update.Err) {
            res.status(400).send("Err: update err");
            return;
        }

        res.status(200).send("Updated successfully")
    } catch (err) {
        console.error(err);
    }
    
}

export default {
    email_phone_edit_step1,
    email_phone_edit_step2,
    get_jobs,
    get_workers,
    get_user,
    find_jobs,
    find_workers,
    get_rewiews,
    send_rewiew,
	get_worker_by_id
};
