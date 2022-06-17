import IUser from "./IUser";

interface IWorker extends IUser{
    birthday: string,
    citizenship: string,
    specialty: string[]
}

export default IWorker;