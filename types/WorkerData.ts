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
};

export default WorkerData;
