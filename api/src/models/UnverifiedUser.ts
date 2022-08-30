import IEmployer from '../interfaces/IEmployer';
import IWorker from '../interfaces/IWorker';
import IUnverifiedUser from '../interfaces/IUnverifiedUser';

import { generate_code, send_sms } from '../lib/codes';

class UnverifiedUser implements IUnverifiedUser {
    time: number;
    user_data: IWorker | IEmployer;
    code: number;
    type: 'worker' | 'employer';

    constructor(user_data: IWorker | IEmployer) {
        const time = Date.now();
        const code = generate_code();

        send_sms(user_data.phone, `Your code: ${code}`);
        
        let type: 'worker' | 'employer';

        if ((user_data as IWorker).specialty != undefined) {
            type = 'worker';
        } else {
            type = 'employer';
        }

        this.time = time;
        this.user_data = user_data;
        this.code = code;
        this.type = type;
    }
}

export default UnverifiedUser;