import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import DB from '../lib/adb';

const secret = 'shhhh';

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unathorized');
    }

    jwt.verify(token, secret, async (error, decoded) => {
        if (error) {
            return res.status(404).json(error);
        }
        res.locals.jwt = decoded;
        console.log(decoded);

        // Store user object in memory
        const db_result = await DB.get_document_by_id('users', res.locals.jwt.userID);

        if (db_result.Err) {
            return res.status(500).send('Oooof');
        }

        res.locals.user = db_result.Ok;

        next();
    });

};

export default auth;