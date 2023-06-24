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
    company_id: string;
    date: string;
    comment: string;
    addresses: ITicketAddress[];
}