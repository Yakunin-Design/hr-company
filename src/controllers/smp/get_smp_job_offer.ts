import db from "../../lib/idb";
import { ObjectId } from "mongodb";

export default async function get_smp_job_offer(job_offer_id: string) {
    const job_offer = await db.find(
        { _id: new ObjectId(job_offer_id) },
        "smp_job_offers"
    );
    if (!job_offer.Ok) return new Error("job offer was not found");

    const school_id = new ObjectId(job_offer.Ok.school_id);
    const db_school = await db.find({ _id: school_id }, "schools");
    const new_data = {
        ...db_school.Ok,
        ...job_offer.Ok,
    };

    return new_data;
}
