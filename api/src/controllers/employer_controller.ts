import { NextFunction, Request, Response } from 'express';

function profile(req: Request, res: Response): void {
    res.status(200).send(res.locals.user);
};

async function edit(req: Request, res: Response): Promise<void> { 
    res.status(200).send('Employer: ok');
}

export default { profile, edit }