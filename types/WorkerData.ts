import Experience from "./Experience";

type WorkerData = {
    _id: string;
    birthday: string;
    citizenship: string;
    email: string;
    full_name: string;
    phone: string;
    specialty: Array<string>;
    status: string;
    logo?: string;
    experience?: Array<Experience | null>;
    job_type?: string;
    city?: string;
    district?: string;
    subway?: string;
    salary?: {
        amount: number;
        period: string;
    };
};

export default WorkerData;
