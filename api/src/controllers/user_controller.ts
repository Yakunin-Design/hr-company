import { Request, Response } from 'express';
import Result from '../lib/Result';
import validator from '../lib/validator';
import { generate_code, send_sms, send_email} from '../lib/codes';
import db from '../lib/idb'; 

// Email / Phone
async function email_phone_edit_step1(req: Request, res: Response): Promise<void> {
    try {
        // Parse data
        const { type, new_value } = req.body;

        // Validation
        let validate: Result<boolean>;
        let old_value: string;

        if (type === 'phone') {
            validate = validator.phone(new_value);
            old_value = res.locals.user.phone;
        }
        else {
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
            type
        }

        const result = await db.save_unique(filter, unverified_edit, 'unverified_edits');
        if (!result.Ok) {
            res.status(400).send('Wrong');
            return;
        }

        // Send code
        if (type === 'phone') {
            send_sms(res.locals.user.phone, `Your code: ${code}`);
        }
        else {
            send_email(res.locals.user.email, `Your code: ${code}`);
        }

        res.status(203).send(result.Ok.toString());
    }
    catch (e) {
        console.log("big OOOF [confirm_phone] --> " + e);
        res.status(500).send('Something went wrong');
    }
}

async function email_phone_edit_step2(req: Request, res: Response): Promise<void> { 
    const { code } = req.body;
    const id = res.locals.user._id;

    // Finding edit
    const unverified_edit = await db.find({_id: id}, 'unverified_edits');
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
    await db.update({ _id: id }, { $set: { [unverified_edit.Ok.type]: unverified_edit.Ok.new_value } }, collection);

    await db.delete(id, 'unverified_edits');

    res.status(203).send('ok');
}

async function get_jobs(req: Request, res: Response): Promise<void> {
    const db_result = await db.find_all({status: 'active'}, 'job_offers', 30);

    // send
    if (db_result.Err) {
        res.status(400).send(db_result.Err.message);
        return;
    }

    res.status(200).send(db_result.Ok!);
}

async function get_workers(req: Request, res: Response): Promise<void> {
    const db_result = await db.find_all({}, 'workers', 30);

    if (db_result.Err) {
        res.status(400).send(db_result.Err.message);
        return;
    }

    res.status(200).send(db_result.Ok!);
}

async function get_user(req: Request, res: Response): Promise<void> {

   res.status(200).send({user_type: res.locals.jwt.user_type, id: res.locals.user._id});
}

export default { email_phone_edit_step1, email_phone_edit_step2, get_jobs, get_workers, get_user }