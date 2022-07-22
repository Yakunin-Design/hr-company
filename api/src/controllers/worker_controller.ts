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

        const allowed_edits = ['full_name', 'birthday', 'citizenship', 'status', 'disctrict', 'metro', 'salary', 'specialty', 'experience', 'documents'];

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

async function my_job(req: Request, res: Response) {

    let responds
    if (res.locals.user.responds) {

        const filter = res.locals.user.responds.map(respond => {return ({_id: respond})})


        responds = await db.find_all({$or: filter}, 'job_offers')
    }


    const Response = {
        my_job: [],
        responds: responds.Ok ? responds.Ok : []
    }

    res.status(200).send(Response);
};

/*
    Check type
    
    Generating code

    Sending code 
   
    
*/

export default { profile, basic_edit , add_respond, my_job};