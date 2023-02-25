import IUser from "./IUser";

interface IEmployer extends IUser{
    company: string,
    inn: string
}

export default IEmployer;