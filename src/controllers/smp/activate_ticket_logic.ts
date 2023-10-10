import { ObjectId } from "mongodb";
import { Response } from "express";
import db from "../../lib/idb";

export default async function activate_ticket(
    ticket_id: string,
    res: Response
) {
    try {
        const id = new ObjectId(ticket_id);
        const ticket = await db.find({ _id: id }, "tickets");
        if (!ticket.Ok || ticket.Ok.length == 0)
            return res.status(404).send("ticket was not found :(");

        if (ticket.Ok.status != "pending")
            return res.status(402).send("already activated");

        const new_addresses = await Promise.all(
            ticket.Ok.addresses.map(async adr => {
                adr.positions = await Promise.all(
                    adr.positions.map(async pos => {
                        const jo_data = {
                            creation_time: new Date(),
                            position: pos.position,
                            working_hours: pos.working_hours,
                            price: pos.price,
                            comment: pos.comment,
                            city: ticket.Ok!.city,
                            quontity: pos.quontity,
                            sex: pos.sex,
                            visitors_count: pos.visitors_count,
                            school_id: adr.school_id,
                            ticket_id: ticket.Ok!._id,
                        };

                        const new_jo = await db.save(jo_data, "smp_job_offers");
                        if (!new_jo.Ok)
                            return res
                                .status(500)
                                .send("smp job offer activation failed");

                        // MARKER 3
                        // ticket position is not getting job offer id update

                        pos.job_offer_id = new_jo.Ok;
                        return pos;
                    })
                );
                return adr;
            })
        );

        await db.update(
            { _id: ticket.Ok._id },
            {
                $set: {
                    status: "in progress",
                    addresses: new_addresses,
                },
            },
            "tickets"
        );

        return true;
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}
