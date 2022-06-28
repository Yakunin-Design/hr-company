import { Request, Response } from 'express';
import { salary, metro } from "../types/worker_types";
import db from '../lib/idb'

type change = {
    name: string,
    value: string | salary | metro | string[]
}

function profile(req: Request, res: Response): void {
    res.status(200).send(res.locals.user);
};

async function basic_edit(req: Request, res: Response): Promise<void> {
    try{
        const allowed_edits = ['full_name', 'birthday', 'citizenship', 'status', 'disctrict', 'metro', 'salary', 'specialty', 'experience', 'documents'];
        let edit = '';

        if (!req.body.name || !req.body.value) {
            res.status(400).send('Invalid data');
            return;
        }

        for (let i = 0; i < allowed_edits.length; i++) {
            if (allowed_edits[i] === req.body.name) {
                edit = req.body.name;
                break;
            }
        }

        if (edit === '') {
            res.status(400).send('Invalid data');    
            return;
        }

        await db.update(res.locals.user, {$set: {[edit]: req.body.value}}, 'workers');

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

export default { profile, basic_edit };