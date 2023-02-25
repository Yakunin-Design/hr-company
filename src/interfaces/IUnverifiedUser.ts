import IEmployer from './IEmployer';
import IWorker from './IWorker';

interface IUnverifiedUser {
    time: number,
    user_data: IWorker | IEmployer,
    code: number
}

export default IUnverifiedUser;