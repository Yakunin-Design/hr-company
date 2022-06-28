import IEmployer from "../interfaces/IEmployer";

class Employer {
    static db_collection: string = 'employers';
    
    constructor(data: IEmployer) {
    }

}

export default Employer;