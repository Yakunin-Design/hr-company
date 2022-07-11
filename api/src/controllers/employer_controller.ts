import { NextFunction, Request, response, Response } from 'express';
import db from '../lib/idb'

import IJobOffer from '../interfaces/IJobOffer';
import { ObjectId } from 'mongodb';

function profile(req: Request, res: Response): void {
    res.status(200).send(res.locals.user);
};

async function basic_edit(req: Request, res: Response): Promise<void> { 
    try{
        const data = req.body;

        const changed_names: Array<string> = Object.keys(data);
        const changed_values: Array<string | object | Array<string>> = Object.values(data);

        const allowed_edits = ['full_name', 'description'];

        let edits = {};
        for (let i = 0; i < changed_names.length; i++) {
            if (allowed_edits.indexOf(changed_names[i]) === -1 || changed_values[i] === '') {
                res.status(400).send('Invalid data');
                return;
            }
            edits[changed_names[i]] = changed_values[i];
        }

        await db.update(res.locals.user, {$set: {...edits}}, 'employers');

        res.status(200).send('Updated');
    }
    catch (e) {
        console.log("[EDIT]", e);
    }
}

function val_job_offer(data: any) {
    // magic validation
    if (!data.specialty || !data.type) {
        return {Ok: null, Err: new Error('empty data fields')}
    }

    return {Ok: data}
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

        const job_offer: IJobOffer = {
            ...validated.Ok!,
            employer_id: res.locals.user._id
        };

        if (!job_offer.point_id) {
            // db.save new point
        }

        // creating the JO in the database [500]
        const db_result = await db.save(job_offer, 'job_offers');

        if (db_result.Err) { 
            res.status(500).send(db_result.Err.message);
            return;
        }

        // sending the response [201]
        res.status(201).send('Created');

    }
    catch (e) {
        console.log(e.message);
    }
}

async function job_offers(req: Request, res: Response): Promise<void> {
    try {
        // find all job offers (with employer_id from jwt)
        const employer_id = res.locals.user._id;

        const db_result = await db.find_all({employer_id: employer_id}, 'job_offers')

        if (db_result.Err) { 
            res.status(500).send(db_result.Err.message);
        }

        const min_job_offers = db_result.Ok!.map(jo => {
            return {
                id: jo._id,
                specialty: jo.specialty
            }
        });

        // send the response [200]
        res.status(200).send(min_job_offers);

    }
    catch (e) {
        console.log(e.message);
    }
}

async function full_job_offer(req: Request, res: Response): Promise<void> { 
    try {
        // get job offer by id form the database
        if (req.params.id.length != 24) {
            res.status(400).send('wrong id!');
            return;
        }

        const job_id = new ObjectId(req.params.id);

        const db_result = await db.find({_id: job_id}, 'job_offers');

        if (db_result.Err) {
            res.status(500).send(db_result.Err.message);
            return;
        }

        if (db_result.Ok === null) { 
            res.status(404).send('Job offer doest not exist');
            return;
        }

        // send the response [200]
        res.status(200).send(db_result.Ok);

    }
    catch (e) {
        console.log(e.message);
    }
}

export default { profile, basic_edit, create_job_offer, job_offers, full_job_offer }