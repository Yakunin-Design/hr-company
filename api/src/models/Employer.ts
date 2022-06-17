import IEmployer from "../interfaces/IEmployer";
import DB from "../lib/adb";

class Employer extends DB {
    static db_collection: string = 'employers';
    
    constructor(data: IEmployer) {
        super(data, Employer.db_collection);
    }

}

export default Employer;