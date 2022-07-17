import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import authorization_router from './routers/authorization_router';
import lk_router from './routers/lk_router';
import find_router from './routers/find_router';
import chat_router from './routers/chat_router';
import cors from 'cors';
import db from './lib/idb';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 6969

app.use(cors());
app.use(express.json());

app.use(authorization_router);
app.use(find_router);
app.use(lk_router);
app.use(chat_router);

(async () => { 
    await db.start_connection()
})()

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    socket.on('select_chat', (chat_id) => {
        socket.join(chat_id);
    })

    socket.on("send_message", (data) => {
        const { chat_id, new_msg_text } = data;

        const message = {
            time: Math.round(Date.now() / 1000),
            sender: false,
            content: new_msg_text
        }

        socket.in(chat_id).emit("receive_message", message);
    })

});

server.listen(PORT, () => console.log('[' + Date.now().toString().slice(9) + '] Server -> OK. Port: ' + PORT));