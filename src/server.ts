import express, { Express, Request, Response } from 'express';
import { test_router } from './routers/test_router';
import path from 'path';
import hbs from 'hbs';

const app = express(); 

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

app.listen(3000, () => console.log('the server is up!'));