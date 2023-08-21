import db from "../../lib/idb";

export default async function send_notification(
    user_id: string,
    text: string,
    proposal_id?: string
) {
    // save notification to db
    const timestamp = Date.now();
    const proposal = proposal_id ? proposal_id : false;

    const notification = {
        timestamp,
        user_id,
        text,
        proposal: proposal,
    };

    const db_noti = await db.save(notification, "notifications");
    if (!db_noti.Ok) return new Error("adding notification failed");

    return true;
}
