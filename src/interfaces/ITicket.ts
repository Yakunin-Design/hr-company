import { ObjectId } from "mongodb";

export interface ITicketCandidate {
    id: string;
    avatar: string;
    fullname: string;
}

export interface ITicketPosition {
    position: string;
    quontity: number;
    working_hours: {
        from: string;
        to: string;
    };
    visitors_count: number | null;
    sex: "any" | "male" | "female";
    comment: string;
    candidates: ITicketCandidate[];
    accepted: string[];
    job_offer_id?: string;
}

export interface ITicketAddress {
    school_number: string;
    address: string;
    subway: string;
    contact: string;
    phone: string;
    positions: ITicketPosition[];
}

export interface ITicket {
    company_id: ObjectId;
    company_name: string;
    date_of_creation: number;
    realization_date: number;
    status: "pending" | "active" | "inactive";
    extended: ObjectId | false;
    city: string;
    total_workers_count: number;
    accepted: number;
    comment: string;
    addresses: ITicketAddress[];
}
