import { Employer } from "./Employer";

class Recruiter extends Employer {
    static recruiters_counter = 0;

    constructor(public name: string) {
        super(name);
        Recruiter.recruiters_counter += 1;
    }
}

export { Recruiter }