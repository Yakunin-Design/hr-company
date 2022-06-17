import { NextFunction, Request, Response } from 'express';

function profile(req: Request, res: Response): void {
    res.status(200).send(res.locals.user);
};

export default { profile }