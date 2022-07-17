import express from 'express';
import authorization_router from './routers/authorization_router';
import lk_router from './routers/lk_router';
import find_router from './routers/find_router';
import chat_router from './routers/chat_router';
import cors from 'cors';
import db from './lib/idb';

const PORT = process.env.PORT || 6969

const app = express();

app.use(cors());
app.use(express.json());

app.use(authorization_router);
app.use(find_router);
app.use(lk_router);
app.use(chat_router);

(async () => { 
    await db.start_connection()
})()

app.listen(PORT, () => console.log('[' + Date.now().toString().slice(9) + '] Server -> OK. Port: ' + PORT));