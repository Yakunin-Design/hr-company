import express, { Express, Request, Response } from 'express';
import { test_router } from './routers/test_router';
import path from 'path';
import hbs from 'hbs';
import http from 'http';

import { Server } from 'socket.io';

const app = express(); 
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Difine path for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDir));
// routers
app.use(test_router);

// Setting up handlebars engine and views loaction
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req: Request, res: Response) => {
    res.send('hi :)');
});

io.on('connection', (socket) => {
    console.log('a new connection!');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (data) => {
        let time = new Date().toTimeString().replace(/:[0-9]{2,2} .*/, '');
        let html = `<li class="msg-block">

        <div class="logo ${data.color}"><span>${data.name.slice(0,1)}</span></div>
        <div class="msg">
            <div class="msg__meta meta-data">
                <div class="meta-data__name">${data.name}</div>
                <div class="meta-data__time">${time}</div>
            </div>
            <p class="msg__text">${data.msg}</p>
        </div>
    </li>`;
        io.emit('chat message', html);
    });

})

server.listen(3000, () => console.log('the server is up!'));