import IWorker from "../interfaces/IWorker";
import { document, experience, salary, metro } from "../types/worker_types";

class Worker{
    email: string;
    phone: string;
    password: string;
    full_name: string; 

    birthday: string; 
    citizenship: string; 
    specialty: string[] = []; 

    status: string = "Готов"; 
    job_preference: string = "Любая";
    salary: salary = {
        period: "hour",
        amount: 100
    }; 
    district: string | null = null; 
    metro: metro | null = null;
    experience: experience[] = [];
    documents: document[] = [];

    photo: File | null = null; 

    constructor(data: IWorker) {
        this.full_name = data.full_name;
        this.email = data.email;
        this.phone = data.phone;
        this.password = data.password;

        this.birthday = data.birthday;
        this.citizenship = data.citizenship;
        this.specialty.push(data.specialty);
    }
}

export default Worker;