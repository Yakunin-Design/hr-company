import { ObjectId } from "mongodb";
import db from "../../lib/idb";

export default async function create_proposal(
    job_offer_id: ObjectId,
    worker_list: ObjectId[]
) {
    const proposal = {
        job_offer_id,
        worker_list,
    };

    const proposal_id = await db.save(proposal, "proposals");
    if (!proposal_id.Ok) throw Error("failed to create proposal");

    // send notification

    // delete work array on worker in db

    return proposal_id.Ok;
}
