import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'mongodb';

import IWorker from '../interfaces/IWorker';
import IEmployer from '../interfaces/IEmployer';

import UnverifiedUser from '../models/UnverifiedUser';
import Worker from '../models/Worker';
import Employer from '../models/Employer';

import DB from '../lib/adb';
import Result from '../lib/Result';
import sign_jwt from '../lib/sign_jwt';
import validator from '../lib/validator';

const SALT = 10;

async function login(req: Request, res: Response): Promise<void> {
    try {
        // Parse input data
        const { login, password } = req.body;

        let user_type: string;
        let user_id: ObjectId;
    
        // Validate password & logins
        if (validator.password(password).Err) {
            res.status(400).send('Wrong login data');
            return;
        }
        if (validator.email(login).Err && validator.phone(login).Err) {
            res.status(400).send('Wrong login');
            return;
        }

        // Check if user exists
        let login_type = "phone";
        if (validator.email(login).Ok) login_type = "email";

        const result_employer = await DB.find_all('employers', {$or: [{ 'email': login }, {'phone': login}]});
        if (result_employer.Err || result_employer.Ok === null) {
            res.status(500).send('DB error');
            return;
        }

        // Employer found
        if (result_employer.Ok.length != 0) {
            const passwords_match = await bcryptjs.compare(password, result_employer.Ok[0].password);

            if (!passwords_match) {
                res.status(400).send('Wrong password');
                return;
            }

            user_type = "employer";
            user_id = result_employer.Ok[0]._id;
        }

        else {
            const result_worker = await DB.find_all('workers', {$or: [{ 'email': login }, {'phone': login}]});
            if (result_worker.Err || result_worker.Ok === null) {
                res.status(500).send('DB error');
                return;
            }

            // Worker found
            if (result_worker.Ok.length != 0) {
                const passwords_match = await bcryptjs.compare(password, result_worker.Ok[0].password);
                if (!passwords_match) {
                    res.status(400).send('Wrong password');
                    return;
                }

                user_type = "worker";
                user_id = result_worker.Ok[0]._id;
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
        if (user_type == 'worker' && (payload.inn || payload.company )) {
            res.status(400).send('Debil');
            return;
        }
        if (user_type == 'employer' && (payload.citizenship || payload.birthday || payload.specialty )) {
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

        // Check if user tried to register before
        const existing_unverified_user = await DB.find_all('unverified_users', {"user_data.email": validate.Ok.email, "user_data.phone": validate.Ok.phone})
        
        if (existing_unverified_user.Err || existing_unverified_user.Ok === null) {
            res.status(500).send('DB error');
            return;
        }

        if (existing_unverified_user.Ok.length > 0) {
            await DB.delete_by_id('unverified_users', existing_unverified_user.Ok[0]._id.toString());
        }
        
        // Encrypting password
        validate.Ok.password = await bcryptjs.hash(validate.Ok.password, 10);

        const unverified_user = new UnverifiedUser(validate.Ok);
        const id = await unverified_user.add();

        if (id.Ok) {
            res.status(201).send(id.Ok.toString());
            return;
        }

        console.log("DB error:" + id.Err?.message);
        res.status(500).send('Something went wrong');
    }
    catch (e) {
        console.log("big OOOF [signup] --> " + e);
        res.status(400).send('Check data');
    }
};

async function confirm_phone(req: Request, res: Response): Promise<void> {
    try {
        const id: string = req.body.id;
        const code: number = req.body.code;

        // Find in NC db
        const user = await DB.get_document_by_id('unverified_users', id);
        if (user.Err) {
            res.status(500).send('DB error');
            return;
        }

        if (user === null) {
            res.status(400).send('Wrong data');
            return;
        }
        
        // Check code
        if (code != user.Ok?.code) {
            res.status(400).send('Invalid code');
            return;
        }

        // Remove from NC collection
        const deleted = await DB.delete_by_id('unverified_users', user.Ok._id.toString());

        if (deleted.Err) {
            res.status(500).send('Cannot delete');
            console.log(deleted.Err.message);
            return;
        }

        // Add user to ______ collecion
        const collection = user.Ok.type + 's';
        let user_id: ObjectId | null = null;

        if (collection === 'workers') {
            const worker = await new Worker(user.Ok?.user_data).add();
            if (worker.Err || worker.Ok == null) {
                res.status(500).send('Problem adding user to db');
            }
            else {
                user_id = worker.Ok;
            }
        }
        else {
            const employer = await new Employer(user.Ok?.user_data).add();
            if (employer.Err || employer.Ok == null) {
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
        res.status(400).send('Something went wrong');
    }
}

export default { login, signup, confirm_phone };