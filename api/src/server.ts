import express from 'express';
import authorization_router from './routers/authorization_router';
import lk_router from './routers/lk_router';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(authorization_router);
app.use(lk_router);

app.listen(3000, () => console.log('[' + Date.now().toString().slice(9) + '] Server -> OK'));