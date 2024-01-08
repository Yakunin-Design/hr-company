import { ObjectId } from "mongodb";
import db from "../../lib/idb";

import { send_message } from "../../../../../yd_api/bots/telegram";

export default async function send_notification(
    user_id: string,
    text: string,
    proposal_id?: string
) {
    const id = new ObjectId(user_id);
    // send notification in telegram if its linked
    const db_user = await db.find({ _id: id }, "workers");
    if (!db_user.Ok)
        return new Error(
            "database error: failed to find user for notification"
        );

    if (db_user.Ok.telegram_id)
        send_message(
            db_user.Ok.telegram_id,
            "Вам предложили выйти на таких же условиях как в прошлый раз. Зайдите в личный кабинет что бы посмотреть предложение. smp.hr-company.org"
        );

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
