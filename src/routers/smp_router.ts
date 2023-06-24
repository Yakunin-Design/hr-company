import { Router, Request, Response } from "express";
import smp_controller from "../controllers/smp_controller";
import auth from '../middleware/auth';

const router = Router();

router.post('/new-ticket', auth, smp_controller.new_ticket);

export default router;
