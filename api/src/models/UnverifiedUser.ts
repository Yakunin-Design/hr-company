import IEmployer from '../interfaces/IEmployer';
import IWorker from '../interfaces/IWorker';
import IUnverifiedUser from '../interfaces/IUnverifiedUser';
import DB from '../lib/adb';

function send_sms(phone: string, code: number): void {
    console.log('Code ' + code + ' was send to ' + phone);
}

class UnverifiedUser extends DB implements IUnverifiedUser {
    static db_collection: string = 'unverified_users';
    time: number;
    user_data: IWorker | IEmployer;
    code: number;
    type: 'worker' | 'employer';

    constructor(user_data: IWorker | IEmployer) {
        const time = Date.now();
        const code = UnverifiedUser.generate_code(user_data.phone);
        let type: 'worker' | 'employer';

        if ((user_data as IWorker).specialty != undefined) {
            type = 'worker';
        } else {
            type = 'employer';
        }

        super({ time, type, user_data, code }, UnverifiedUser.db_collection);

        this.time = time;
        this.user_data = user_data;
        this.code = code;
        this.type = type;
    }

    private static generate_code(phone: string): number {
        const code: number = Math.floor(1000 + Math.random() * 9000);
        send_sms(phone, code);
        return code;
    }
}

export default UnverifiedUser;