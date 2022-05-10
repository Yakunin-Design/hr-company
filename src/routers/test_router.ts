import { Router, Request, Response } from "express";
import { db } from "../controllers/DB_controller";
import { FullTimeJobOffer, JobOffer } from "../interfaces/JobOffer"; 
import { Employer } from "../models/Employer";
import { Organization } from "../models/Organization";

const test_router = Router();

test_router.get('/test', (req: Request, res: Response) => res.send('this is response form test router!'));

test_router.get('/search', (req: Request, res: Response) => res.render('search'));

test_router.get('/chat', async (req: Request, res: Response) => {
    res.render('chat');
});

function validate(jo: JobOffer): boolean {
    return true;
}

test_router.post('/jobs/create', async (req: Request, res: Response) => {
    // data from auth middleware
    const YakuninHoldings = new Organization('Yakunin Holings');
    const id: number = 0;

    let hired: Worker[] = [];
    let applicants: Worker[] = [];

    // the JSON is already parsed here bc of app configuration at server.ts file
    let new_job_offer = req.body;
    
    new_job_offer.host = YakuninHoldings;
    new_job_offer.id = id;
    new_job_offer.hired = hired;
    new_job_offer.aplicants = applicants;

    // console.log(process.env.DB_CONNECTION_URL);
    console.log('localhost');

    // validate
    if (validate(new_job_offer)) {
        await db.write_one('job_offers', new_job_offer);
        return res.status(200).send(new_job_offer);
    }

    res.status(400).send('The data to create users is wrong!');
});

test_router.post('/get-job-offers', async (req: Request, res: Response) => {
    const payload: string = req.body.payload;
    console.log(payload);
    // error if regex is incorect
    let db_result = await db.read_many('job_offers', { title: { $regex: new RegExp('^' + payload + '.*', 'i')}});
    db_result = db_result.slice(0, 5);
    let response_array:string[] = [];
    db_result.forEach((e) => {
        response_array.push(e.title);
    })
    console.log(response_array);
    res.status(200).send(JSON.stringify({titles: response_array}));
});

export { test_router }