import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import db from '../lib/idb';

const SECRET = 'shhhh';

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unathorized');
    }

    jwt.verify(token, SECRET, async (error, decoded) => {
        if (error) {
            return res.status(404).json(error);
        }

        res.locals.jwt = decoded;

        // Store user object in memory

        let db_result = await db.find({_id: new ObjectId(res.locals.jwt.userID)},res.locals.jwt.user_type + 's', );

        if(!db_result.Ok) {
            return res.status(500).send('Something went wrong');
        }

        delete db_result.Ok.password;

        if (db_result.Err) {
            return res.status(500).send('Oooof');
        }

        res.locals.user = db_result.Ok;

        next();
    });

};
export default auth;