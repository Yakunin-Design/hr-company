import IUser from "../interfaces/IUser";
import DB from "../lib/adb";

class User extends DB {
    static db_collection: string = 'users';
    
    constructor(data: IUser) {
        super(data, User.db_collection);
    }

}

export default IUser;