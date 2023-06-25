import { Router, Request, Response } from "express";
import smp_controller from "../controllers/smp_controller";
import auth from '../middleware/auth';

const router = Router();

router.post('/new-ticket', auth, smp_controller.new_ticket);

router.get('/tickets', auth, smp_controller.get_all_tickets);
router.get('/tickets/:id', auth, smp_controller.get_ticket_by_id);

router.get('/address/:id/:number', auth, smp_controller.get_address);

export default router;
