import IUser from "./IUser";
import { document, experience, salary, subway } from "../types/worker_types";

interface IWorker extends IUser{
    birthday: string,
    citizenship: string,
    specialty: string,

    status?: "Готов" | "Не готов",
    job_preference?: "Любая" | "Временная" | "Постоянная",
    salary?: salary,
    district?: string | null,
    metro?: subway | null,
    experience?: experience[],
    documents?: document[],
}

export default IWorker;