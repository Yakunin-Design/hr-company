import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
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
        const { chat_id, new_msg_text, my_jwt } = data;

        let my_id, my_user_type;
        jwt.verify(my_jwt, 'shhhh', async (error, decoded) => {
            
            my_id = decoded.userID;
            my_user_type = decoded.user_type;
            
        });

        const chat = db.find({_id: new ObjectId(chat_id)}, 'chats').then(result => {

            const user1 = result.Ok!.user1.toString()
            const user2 = result.Ok!.user1.toString()
            const sender = user1 === my_id ? 1 : 2;
            const time = Math.floor(Date.now() / 1000)

            const new_msg = {
                time: time,
                sender: sender,
                content: new_msg_text
            };
            const messages = [...result.Ok!.msgs, new_msg];

            const unread_count1 = sender === 1 ? result.Ok!.unread_count1 : result.Ok!.unread_count1+1;
            const unread_count2 = sender === 2 ? result.Ok!.unread_count2 : result.Ok!.unread_count2+1;

            const edits = {
                msgs: messages,
                unread_count1,
                unread_count2,
            }

            const update_result = db.update({_id: new ObjectId(chat_id)}, {$set: {...edits}}, 'chats').then(update_result => {
                
                const message = {
                    time: Math.round(Date.now() / 1000),
                    sender: false,
                    content: new_msg_text
                }
        
                socket.in(chat_id).emit("receive_message", message);
            })

        })
    })

});

server.listen(PORT, () => console.log('[' + Date.now().toString().slice(9) + '] Server -> OK. Port: ' + PORT));