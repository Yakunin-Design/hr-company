import express from 'express';
import user_router from './routers/user_router';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(user_router);

app.listen(3000, () => console.log('the server is up!'));