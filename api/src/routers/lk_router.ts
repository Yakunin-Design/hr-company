import { Router, Request, Response, NextFunction } from "express";
import auth from '../middleware/auth';
import role_flow from "../middleware/role_flow";

const router = Router();

router.get('/profile', auth, role_flow.employer_worker_flow);

export default router;