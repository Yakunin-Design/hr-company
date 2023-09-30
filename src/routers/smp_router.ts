import { Router, Request, Response } from "express";
import smp_controller from "../controllers/smp_controller";
import auth from "../middleware/auth";
import auth_moderator from "../middleware/auth_moderator";

const router = Router();

router.post("/new-ticket", auth, smp_controller.new_ticket);
router.get("/tickets", auth, smp_controller.get_all_tickets);
router.get("/tickets/:id", auth, smp_controller.get_ticket_by_id);

router.get("/activate-ticket/:id", auth, smp_controller.activate_ticket);
router.get("/close-ticket/:id", auth, smp_controller.close_ticket);
router.get("/extend-ticket/:id", auth, smp_controller.extend_ticket);

router.get("/address/:id/:number", auth, smp_controller.get_address);
router.get(
    "/address/:id/:number/:position_index",
    auth,
    smp_controller.get_position
);

router.get("/smp-job-offers", smp_controller.get_job_offers);
router.get("/smp-job-offers/:id", smp_controller.get_job_offer_by_id);

router.post("/smp-respond", auth, smp_controller.respond);
router.post("/smp-respond-status", auth, smp_controller.respond_status);

router.post(
    "/smp-accept",
    auth,
    auth_moderator,
    smp_controller.accept_candidate
);

router.get("/proposal/:id", auth, smp_controller.get_proposal_by_id);

router.post("/accept-proposal/:id", auth, smp_controller.accept_proposal);

export default router;
