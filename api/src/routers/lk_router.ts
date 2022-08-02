import { Router, Request, Response } from 'express';
import worker_controller from '../controllers/worker_controller';
import employer_controller from '../controllers/employer_controller';
import user_controller from '../controllers/user_controller';
import auth from '../middleware/auth';

const router = Router();

//profile
router.get('/profile', auth, (req: Request, res: Response) => {
    res.locals.jwt.user_type === 'worker'
        ? worker_controller.profile(req, res)
        : employer_controller.profile(req, res);
});

router.post('/profile/edit', auth, (req: Request, res: Response) => {
    res.locals.jwt.user_type === 'worker'
        ? worker_controller.basic_edit(req, res)
        : employer_controller.basic_edit(req, res);
});

router.post('/profile/verified_edit1', auth, (req: Request, res: Response) => {
    user_controller.email_phone_edit_step1(req, res);
});

router.post('/profile/verified_edit2', auth, (req: Request, res: Response) => {
    user_controller.email_phone_edit_step2(req, res);
});

//job offer
router.post('/new-job-offer', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.create_job_offer(req, res);
});

router.post('/edit-job-offer', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.edit_job_offer(req, res);
});

router.get('/job-offers', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.job_offers(req, res);
});

router.get('/job-offers/:id', (req: Request, res: Response) =>
    employer_controller.full_job_offer(req, res)
);

router.post('/new-respond', (req: Request, res: Response) => {
    worker_controller.add_respond(req, res);
});

router.post('/get-candidates', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.get_candidates(req, res);
    else res.status(401).send('unauthorized');
});

router.post('/get-worker-bank', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.get_worker_bank(req, res);
    else res.status(401).send('unauthorized');
});

//point
router.post('/new-point', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.create_point(req, res);
    else res.status(401).send('unauthorized');
});

router.get('/get-points', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.get_points(req, res);
    else res.status(401).send('unauthorized');
});

router.post('/get-point-data', auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === 'employer')
        employer_controller.get_point_data(req, res);
    else res.status(401).send('unauthorized');
});

// my job
router.get('/my-job', auth, (req: Request, res: Response) => {
    worker_controller.get_my_jobs(req, res);
});

export default router;
