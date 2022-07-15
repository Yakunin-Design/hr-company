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

        /**
         * TODO: Already responded
         */

        const candidate_count = job_offer.Ok.candidate_count + 1;
        const candidates = [...job_offer.Ok.candidates , worker_id];

        await db.update({_id: job_offer_id}, {$set: {candidates: candidates, candidate_count: candidate_count}}, 'job_offers');

        res.status(200).send('Updated');
    } catch (e) {
        console.log("[EDIT]", e);
    }
}

/*
    Check type
    
    Generating code

    Sending code 
   
    
*/

export default { profile, basic_edit , add_respond};