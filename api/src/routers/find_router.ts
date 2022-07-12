import { Router, Request, Response } from "express";
import user_controller from "../controllers/user_controller";

const router = Router();

router.get('/find-job', (req: Request, res: Response) => {
    user_controller.get_jobs(req, res);
})

router.get('/find-workers', (req: Request, res: Response) => {
    user_controller.get_workers(req, res);
})

export default router;