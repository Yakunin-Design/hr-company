import express, { Express, Request, Response } from 'express';

import { test_router } from './routers/test_router';

const app = express(); 

app.use(express.json());
// routers
app.use(test_router);

app.get('', (req: Request, res: Response) => {
    res.send('hi :)');
});

app.listen(6969, () => console.log('the server is up!'));