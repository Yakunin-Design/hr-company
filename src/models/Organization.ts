import { Employer } from './Employer';

class Organization extends Employer {
    static organizations_counter = 0;
    constructor(public name: string) {
        super(name);
        Organization.organizations_counter += 1;
    }
}

export { Organization }