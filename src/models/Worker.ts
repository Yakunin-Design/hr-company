import { JobOffer } from "../interfaces/JobOffer";

class Worker {
    static worker_count = 0;

    protected opened_jobs: JobOffer[] = [];
    protected applied_to: JobOffer[] = [];

    constructor(
        public name: string
    ) {
        Worker.worker_count += 1;
    }

    apply_to_new_job(jo: JobOffer): void {
        this.applied_to.push(jo);
    }
}

export { Worker }