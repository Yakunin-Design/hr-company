import { Router } from "express";
import user_controller from "../controllers/user_controller";

const router = Router();

router.get('/find-job', user_controller.get_jobs)
router.get('/find-workers', user_controller.get_workers)

export default router;