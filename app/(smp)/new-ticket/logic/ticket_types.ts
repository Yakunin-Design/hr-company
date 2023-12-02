export type ticket_data = {
    company_id: string;
    date: string;
    comment: string;
    addresses: ticket_addres[];
};

export type ticket_addres = {
    school_name: string;
    school_number: number | null;
    address: string;
    subway: string;
    contact: string;
    phone: string;
    positions: ticket_position[];
};

export type ticket_position = {
    position: string;
    quontity: number;
    working_hours: {
        from: string;
        to: string;
    };
    visitors_count: number | null;
    sex: "any" | "male" | "female";
    comment: string;
    candidates: ticket_candidate[];
    accepted: string[];
};

export type ticket_candidate = {
    id: string;
    avatar: string;
    fullname: string;
};
