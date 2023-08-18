import { Router, Request, Response } from "express";
import worker_controller from "../controllers/worker_controller";
import employer_controller from "../controllers/employer_controller";
import user_controller from "../controllers/user_controller";
import auth from "../middleware/auth";

const router = Router();

//profile
router.get("/profile", auth, (req: Request, res: Response) => {
    res.locals.jwt.user_type === "worker"
        ? worker_controller.profile(req, res)
        : employer_controller.profile(req, res);
});

router.post("/profile/edit", auth, (req: Request, res: Response) => {
    res.locals.jwt.user_type === "worker"
        ? worker_controller.basic_edit(req, res)
        : employer_controller.basic_edit(req, res);
});

router.post("/profile/verified_edit1", auth, (req: Request, res: Response) => {
    user_controller.email_phone_edit_step1(req, res);
});

router.post("/profile/verified_edit2", auth, (req: Request, res: Response) => {
    user_controller.email_phone_edit_step2(req, res);
});

router.post("/delete-exp", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "worker")
        worker_controller.delete_experience(req, res);
});

//job offer
router.post("/new-job-offer", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.create_job_offer(req, res);
});

router.post("/edit-job-offer", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.edit_job_offer(req, res);
});

router.post("/close-job-offer", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.close_job_offer(req, res);
});

router.post("/activate-job-offer", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.activate_job_offer(req, res);
});

router.post("/job-offer-accept", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.accept_worker(req, res);
});

router.get("/job-offers", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.job_offers(req, res);
});

router.get("/job-offers/:id", (req: Request, res: Response) =>
    employer_controller.full_job_offer(req, res)
);

router.get("/job-offers/:id/check", auth, (req: Request, res: Response) =>
    employer_controller.job_offer_check(req, res)
);

router.get("/job-offers/:id/get-point-data", (req: Request, res: Response) =>
    employer_controller.job_offer_get_emp_data(req, res)
);

router.post("/new-respond", (req: Request, res: Response) => {
    worker_controller.add_respond(req, res);
});

router.post("/get-candidates", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.get_candidates(req, res);
    else res.status(401).send("unauthorized");
});

router.post("/get-workers", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.get_workers(req, res);
    else res.status(401).send("unauthorized");
});

router.post("/get-worker-bank", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.get_worker_bank(req, res);
    else res.status(401).send("unauthorized");
});

//point
router.post("/new-point", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.create_point(req, res);
    else res.status(401).send("unauthorized");
});

router.post("/delete-point", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.delete_point(req, res);
    else res.status(401).send("unauthorized");
});

router.get("/get-points", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.get_points(req, res);
    else res.status(401).send("unauthorized");
});

router.post("/get-point-data", auth, (req: Request, res: Response) => {
    if (res.locals.jwt.user_type === "employer")
        employer_controller.get_point_data(req, res);
    else res.status(401).send("unauthorized");
});

// my job
router.get("/my-job", auth, (req: Request, res: Response) => {
    worker_controller.get_my_jobs(req, res);
});

router.get("/get-rewiews", auth, (req: Request, res: Response) => {
    user_controller.get_rewiews(req, res);
});

router.post("/send-rewiew", auth, (req: Request, res: Response) => {
    user_controller.send_rewiew(req, res);
});

router.get("/notifications", auth, (req: Request, res: Response) => {
    user_controller.get_notifications(req, res);
});

router.post("/add-noti", auth, (req: Request, res: Response) => {
    user_controller.add_notification(req, res);
});

export default router;
