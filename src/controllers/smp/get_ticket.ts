import db from "../../lib/idb";
import { ObjectId } from "mongodb";

export default async function get_ticket(ticket_id: string) {
    // get ticket id
    const db_ticket_id = new ObjectId(ticket_id);

    // find ticket in db
    const db_ticket = await db.find({ _id: db_ticket_id }, "tickets");
    if (db_ticket.Err) return new Error("failed to fetch ticket data");

    if (db_ticket.Ok === null) return new Error("bruh why is this null");

    // getting data setup for frontend (school data + worker_count & accepted)
    const address_data = await Promise.all(
        db_ticket.Ok.addresses.map(async adr => {
            // get all school data
            const address = await db.find({ _id: adr.school_id }, "schools");

            // getting worker count & accepted count
            let worker_count = 0;
            let accepted = 0;
            adr.positions.map(pos => {
                worker_count += Number(pos.quontity);
                accepted += pos.accepted.length;
            });

            return {
                ...address.Ok,
                worker_count,
                accepted,
            };
        })
    );

    const response_data = {
        ...db_ticket.Ok,
        addresses: address_data,
    };

    // send the ticket
    return response_data;
}
