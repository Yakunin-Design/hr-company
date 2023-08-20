import db from "../../lib/idb";
import { Response } from "express";

export default async function close_ticket_logic(
    ticket: any,
    // ticket: Result<WithId<Document> | null>,
    res: Response
) {
    await ticket.Ok!.addresses.forEach(async address => {
        await address.positions.forEach(async position => {
            const filter = {
                ticket_id: ticket.Ok?._id,
                school_id: address.school_id,
                position: position.position,
            };

            const job_offer = await db.find(filter, "smp_job_offers");

            if (job_offer.Ok) {
                const workers = position.accepted;

                await workers.forEach(async worker => {
                    const db_worker = await db.find({ _id: worker }, "workers");

                    if (db_worker.Err)
                        return res.status(400).send("find worker error");

                    if (db_worker.Ok) {
                        const old_worker_work = db_worker.Ok.work;
                        console.log(old_worker_work);
                        const new_worker_work = old_worker_work.filter(
                            work => work.toString() != job_offer.Ok?._id
                        );
                        const update_worker = await db.update(
                            { _id: worker },
                            { $set: { work: new_worker_work } },
                            "workers"
                        );

                        if (update_worker.Err)
                            return res.status(400).send("update error");
                    }
                });

                const delete_job_offer = await db.delete(
                    job_offer.Ok._id.toString(),
                    "smp_job_offers"
                );

                if (delete_job_offer.Err)
                    return res.status(400).send("delete job offer error");
            }
        });
    });

    const update_ticket = await db.update(
        { _id: ticket.Ok?._id },
        { $set: { status: "closed" } },
        "tickets"
    );

    if (update_ticket.Err) return res.status(400).send("update ticket error");
}
