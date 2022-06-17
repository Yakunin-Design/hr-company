import { Router, Request, Response } from "express";
import controller from '../controllers/authorization_controller';

const router = Router();

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/phone-confirmation', controller.confirm_phone);

export default router;