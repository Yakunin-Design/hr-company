import User from "../interfaces/User";
import DB from "../lib/adb";

class UserModel extends DB  {
    static db_collection: string = 'users';
    
    constructor(data: User) {
        super(data, UserModel.db_collection);
    }

}

export default UserModel;