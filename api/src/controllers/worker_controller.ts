import { Request, Response } from 'express';

function profile(req: Request, res: Response): void {
    console.log(res.locals);
    res.status(200).send(res.locals.user);
};

export default { profile };