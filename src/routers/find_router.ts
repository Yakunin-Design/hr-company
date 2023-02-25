import { Router, Request, Response } from "express";
import user_controller from "../controllers/user_controller";
import auth from '../middleware/auth';


const router = Router();

router.get('/find-job', user_controller.get_jobs)
router.post('/find-job', user_controller.find_jobs)
router.get('/find-workers', user_controller.get_workers)
router.post('/find-workers', user_controller.find_workers)
router.get('/find-user', auth, (req: Request, res: Response) => {
    user_controller.get_user(req, res)
});

export default router;