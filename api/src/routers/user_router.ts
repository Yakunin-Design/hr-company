import { Router, Request, Response } from "express";
import controller from '../controllers/user_controller';
import auth from '../middleware/auth';

const router = Router();

router.post('/user/register', controller.register);
router.post('/user/login', controller.login);

router.get('/whoami', auth, controller.whoami);

export default router;