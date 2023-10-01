export type ticket_status =
    | "pending"
    | "in progress"
    | "staffed"
    | "realisation"
    | "closed";

export function convert_status(status: ticket_status): string {
    if (status === "pending") return "Ожидает подтверждения";
    if (status === "in progress") return "В работе";
    if (status === "staffed") return "Укомплектована";
    if (status === "realisation") return "Реализуется";
    if (status === "closed") return "В архиве";

    return "WRONG STATUS";
}
