import { Request, Response } from 'express';
import { salary, subway } from "../types/worker_types";
import { ObjectId } from 'mongodb';
import db from '../lib/idb'

type change = {
    name: string,
    value: string | salary | subway | string[]
}

function profile(req: Request, res: Response): void {
    res.status(200).send(res.locals.user);
};

async function basic_edit(req: Request, res: Response): Promise<void> {
    try{
        const data = req.body;

        const changed_names: Array<string> = Object.keys(data);
        const changed_values: Array<string | object | Array<string>> = Object.values(data);

        const allowed_edits = ['full_name', 'birthday', 'citizenship', 'status', 'job_type', 'district', 'subway', 'salary', 'specialty', 'experience', 'documents', 'logo'];

        let edits = {};
        for (let i = 0; i < changed_names.length; i++) {
            if (allowed_edits.indexOf(changed_names[i]) === -1 || changed_values[i] === '') {
                res.status(400).send('Invalid data');
                return;
            }
            edits[changed_names[i]] = changed_values[i];
        }

        await db.update(res.locals.user, {$set: {...edits}}, 'workers');

        res.status(200).send('Updated');
    } catch (e) {
        console.log("[EDIT]", e);
    }
}

async function add_respond(req: Request, res: Response): Promise<void> {
    try{
        const worker_id = new ObjectId(req.body.worker_id);
        const job_offer_id = new ObjectId(req.body.job_offer_id);

        const job_offer = await db.find({_id: job_offer_id}, 'job_offers');

        if (job_offer.Ok === null) {
            res.status(400).send('Wrong update');
            return;
        }

        let already_responded = false;
        job_offer.Ok.candidates.map((candidate) => {
            if (candidate.toString() === worker_id.toString()) {
                already_responded = true;
            }
        })

        if (already_responded) {
            res.status(400).send('already_responded');
            return;
        }

        const candidate_count = job_offer.Ok.candidate_count + 1;
        const candidates = [...job_offer.Ok.candidates , worker_id];

        const user = await db.find({_id: worker_id}, 'workers');
        let responds = user.Ok!.responds || [];

        responds.push(job_offer_id)

        await db.update({_id: job_offer_id}, {$set: {candidates: candidates, candidate_count: candidate_count}}, 'job_offers');
        await db.update({_id: worker_id}, {$set: {responds: responds}}, 'workers');

        res.status(200).send('Updated');
    } catch (e) {
        console.log("[EDIT]", e);
    }
}

async function get_my_jobs(req: Request, res: Response) {
    if (!res.locals.user.responds) return res.status(200).send([]);

    const filter: Object[] = res.locals.user.responds.map((application: ObjectId) => ({ _id: application }));
    const applications = await db.find_all({ $or: filter }, 'job_offers');

    const Response = {
        my_job: [],
        responds: applications.Ok ? applications.Ok : []
    }

    res.status(200).send(Response);
};

async function delete_experience(req: Request, res: Response) {

    const { user } = res.locals;
    const experience = req.body;

    const new_exp = user.experience.filter(exp => {
        if (
            (exp.tittle == experience.tittle && 
            exp.employer == experience.employer && 
            exp.description == experience.description) === false
            ) {
                return exp;
            }
    })

    const update = await db.update({_id: user._id}, {$set: {experience: new_exp}}, 'workers');

    if (update.Ok) res.status(200).send('ok')
    else res.status(400).send('smth went wrong');
}

export default { profile, basic_edit , add_respond, get_my_jobs, delete_experience};