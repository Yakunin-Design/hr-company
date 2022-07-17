import { Router } from "express"; 
import auth from '../middleware/auth';
import { get_chats, get_messages, send_message, create_chat } from "../controllers/chat_controller";

const router = Router();

router.get('/chats', auth, get_chats)
router.post('/messages', auth, get_messages)
router.post('/send-message', auth, send_message)

export default router;