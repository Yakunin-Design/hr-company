import { NextFunction, Request, Response } from 'express';
import employer_controller from '../controllers/employer_controller';
import worker_controller from "../controllers/worker_controller";

function employer_worker_flow(req: Request, res: Response, next: NextFunction): void {
    console.log(res.locals);

    res.locals.jwt.user_type
        ? next(worker_controller.profile(req, res))
        : next(employer_controller.profile(req, res))
};

export default { employer_worker_flow }