import { Router, Request, Response } from "express";
import worker_controller from "../controllers/worker_controller";
import employer_controller from '../controllers/employer_controller';
import user_controller from '../controllers/user_controller';
import auth from '../middleware/auth';

const router = Router();

router.get('/profile', auth, (req: Request, res: Response) => {
    res.locals.jwt.user_type === 'worker'
        ? worker_controller.profile(req, res)
        : employer_controller.profile(req, res)
});

router.post('/profile/edit', auth, (req: Request, res: Response) => {
    res.locals.jwt.user_type === 'worker'
        ? worker_controller.basic_edit(req, res)
        : employer_controller.basic_edit(req, res)
});

router.post('/profile/verified_edit1', auth, (req: Request, res: Response) => {
    user_controller.email_phone_edit_step1(req, res)
})

router.post('/profile/verified_edit2', auth, (req: Request, res: Response) => {
    user_controller.email_phone_edit_step2(req, res)
})

export default router;