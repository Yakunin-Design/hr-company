import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'mongodb';

import IWorker from '../interfaces/IWorker';
import IEmployer from '../interfaces/IEmployer';

import UnverifiedUser from '../models/UnverifiedUser';

import Result from '../lib/Result';
import sign_jwt from '../lib/sign_jwt';
import validator from '../lib/validator';
import db from '../lib/idb';

async function login(req: Request, res: Response): Promise<void> {
    try {
        // Parse input data
        const { login, password } = req.body;

        let user_type: string;
        let user_id: ObjectId;
    
        // password & logins could be valid
        if (validator.password(password).Err) {
            res.status(400).send('Wrong data');
            return;
        }
        if (validator.email(login).Err && validator.phone(login).Err) {
            res.status(400).send('Wrong login');
            return;
        }

        // Check if user exists
        let login_type = "phone";
        if (validator.email(login).Ok) login_type = "email";

        const result_employer = await db.find({$or: [{ 'email': login }, {'phone': login}]}, 'employers');
        if (result_employer.Err) {
            res.status(500).send('DB error');
            return;
        }

        // Employer found
        if (result_employer.Ok != null) {
            const passwords_match = await bcryptjs.compare(password, result_employer.Ok.password);

            if (!passwords_match) {
                res.status(400).send('Wrong password');
                return;
            }

            user_type = "employer";
            user_id = result_employer.Ok._id;
        }

        else {
            const result_worker = await db.find({$or: [{ 'email': login }, {'phone': login}]}, 'workers');
            if (result_worker.Err) {
                res.status(500).send('DB error');
                return;
            }

            // Worker found
            if (result_worker.Ok != null) {
                const passwords_match = await bcryptjs.compare(password, result_worker.Ok.password);
                if (!passwords_match) {
                    res.status(400).send('Wrong password');
                    return;
                }

                user_type = "worker";
                user_id = result_worker.Ok._id;
            }
            else {
                res.status(400).send('Account with passed cardentials was not found');
                return;
            }
        }
        
        // Sign JWT
        const jwt = sign_jwt(user_id!, user_type!);

        // Send jwt to client
        res.status(200).send(jwt.Ok);
    
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong!');
    }
};

async function signup(req: Request, res: Response): Promise<void> {
    try {

        // Get user type
        const { user_type, payload } = req.body;

        // Check user type 
        if (user_type != 'worker' && user_type != 'employer') {
            res.status(400).send('Wrong data');
            return;
        };

        // Check if user type and content matches
        if (user_type == 'worker' && (payload.inn || payload.company)) {
            res.status(400).send('Debil');
            return;
        }
        if (user_type == 'employer' && (payload.citizenship || payload.birthday || payload.specialty)) {
            res.status(400).send('Debil');
            return;
        }

        // Validating input
        const validate: Result<IEmployer | IWorker> = user_type === "worker"
            ? await validator.worker_checks(payload)
            : await validator.employer_checks(payload);

        if (validate.Err) {
            res.status(400).send(validate.Err.message);
            return;
        }
        if (validate.Ok === null) {
            res.status(400).send('Validation error');
            return;
        }

        // Encrypting password
        validate.Ok.password = await bcryptjs.hash(validate.Ok.password, 10);

        // Unique save to db
        const filter = { 
            $or: [
                { "user_data.email": validate.Ok.email },
                { "user_data.phone": validate.Ok.phone }
            ]
        };

        const unverified_user = new UnverifiedUser(validate.Ok);
        const id = await db.save_unique(filter, unverified_user, 'unverified_users');

        if (id.Ok) {
            res.status(201).send(id.Ok.toString());
            return;
        }

        console.log("DB error:" + id.Err?.message);
        res.status(500).send('Something went wrong');
    }
    catch (e) {
        console.log("big OOOF [signup] --> " + e);
        res.status(500).send('Check data');
    }
};

async function confirm_phone(req: Request, res: Response): Promise<void> {
    try {
        const id: string = req.body.id;
        const code: number = req.body.code;

        console.log(code)

        // Find in NC db
        const user = await db.find({_id: new ObjectId(id)}, 'unverified_users');
        if (!user.Ok) {
            res.status(500).send('DB error');
            return;
        }

        if (user.Ok === null) {
            res.status(400).send('Wrong data');
            return;
        }
        
        // Check code
        if (code != user.Ok?.code) {
            res.status(400).send('Invalid code');
            return;
        }

        // Remove from NC collection
        const deleted = await db.delete(user.Ok._id.toString(), 'unverified_users');

        if (!deleted.Ok) {
            res.status(500).send('Cannot delete');
            return;
        }

        // Add user to Employer/Worker collecion
        const collection = user.Ok.type + 's';
        let user_id: ObjectId | null = null;

        if (collection === 'workers') {
            const worker = await db.save({...user.Ok?.user_data, status: "ready"}, 'workers');
            if (!worker.Ok) {
                res.status(500).send('Problem adding user to db');
            }
            else {
                user_id = worker.Ok;
            }
        }
        else {
            const employer = await db.save(user.Ok?.user_data, 'employers');
            if (!employer.Ok) {
                res.status(400).send('Problem adding user to db');
                return;
            }
            else {
                user_id = employer.Ok;
            }
        }

        // Sign JTW
        if (!user_id) {
            res.status(400).send('Cant sign jwt');
            return;
        }

        const jwt = sign_jwt(user_id, user.Ok.type);

        if (!jwt.Ok) {
            res.status(400).send('Problem adding user to db');
            return;
        }

        res.send(jwt.Ok);
    }
    catch (e) {
        console.log("big OOOF [confirm_phone] --> " + e);
        res.status(500).send('Something went wrong');
    }
}


export default { login, signup, confirm_phone };