import { Router, Request, Response } from "express";
import smp_controller from "../controllers/smp_controller";
import auth from "../middleware/auth";
import auth_moderator from "../middleware/auth_moderator";

const router = Router();

router.post("/new-ticket", auth, smp_controller.new_ticket);
router.get("/tickets", auth, smp_controller.get_all_tickets);
router.get("/archive", auth, smp_controller.get_archived_tickets);
router.get("/tickets/:id", auth, smp_controller.get_ticket_by_id);

router.get("/activate-ticket/:id", auth, smp_controller.activate_ticket);
router.get("/close-ticket/:id", auth, smp_controller.close_ticket);
router.get("/extend-ticket/:id", auth, smp_controller.extend_ticket);
router.post("/edit-ticket", auth, smp_controller.edit_ticket);

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

router.post("/proposal/:id/accept", auth, smp_controller.accept_proposal);
router.post("/proposal/:id/decline", auth, smp_controller.decline_proposal);

router.post("/new-school", auth, smp_controller.new_school);
router.post("/update-school/:id", auth, smp_controller.update_school);
router.get("/schools", auth, smp_controller.get_all_schools);
router.get("/schools/:id", auth, smp_controller.get_school_by_id);
router.delete("/schools/:id", auth, smp_controller.delete_school_by_id);

// router.patch("/schools/:id", auth, smp_controller.get_proposal_by_id);

export default router;
