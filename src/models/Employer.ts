import { JobOffer } from '../interfaces/JobOffer';

abstract class Employer {
    job_offers: JobOffer[] = [];

    constructor(
        public name: string
    ){}

    add_job_offer(jo: JobOffer): void {
        this.job_offers.push(jo);
    }

    get_job_offers(): JobOffer[] {
        return this.job_offers;
    }

    log_all_job_offers(): void {
        if (this.job_offers.length === 0) console.log('You dont have any job offers yet. Try adding one!')
        else this.job_offers.forEach(e => console.log(e));
    }

}

export { Employer }