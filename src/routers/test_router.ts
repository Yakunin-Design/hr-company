import { Router, Request, Response } from "express";
import { db } from "../controllers/DB_controller";
import { FullTimeJobOffer, JobOffer } from "../interfaces/JobOffer"; 
import { Employer } from "../models/Employer";
import { Organization } from "../models/Organization";

const test_router = Router();

test_router.get('/test', (req: Request, res: Response) => res.send('this is response form test router!'));

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

    console.log(process.env.DB_CONNECTION_URL);

    // validate
    if (validate(new_job_offer)) {
        await db.write_one('job_offers', new_job_offer);
        return res.status(200).send(new_job_offer);
    }

    res.status(400).send('The data to create users is wrong!');
});

export { test_router }