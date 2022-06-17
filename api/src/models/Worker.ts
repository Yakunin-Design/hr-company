import IWorker from "../interfaces/IWorker";
import DB from "../lib/adb";

class Worker extends DB {
    static db_collection: string = 'workers';
    
    constructor(data: IWorker) {
        super(data, Worker.db_collection);
    }

}

export default Worker;