import axios from "axios";
import { cookies } from "next/headers";

import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Notification from "./Notification";
import Card from "@/components/Card";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import NotificationSettings from "./NotificationSettings";

type notification = {
    text: string;
    timestamp: string;
    user_id: string;
    proposal: string;
};

async function get_notifications() {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    const db_notifications = await axios.get(
        `${process.env.API_ADDRESS}/notifications`,
        config
    );

    return db_notifications.data;
}

export default async function Notifications() {
    const data = await get_notifications();

    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;

    const notifications = data.map((noti: notification) =>
        Notification({
            text: noti.text,
            timestamp: noti.timestamp,
            proposal_id: noti.proposal,
        })
    );

    return (
        <Container lk wrapper>
            <Spacer top={2} />
            <NotificationSettings />
            <h2>Уведомления</h2>
            {notifications.length === 0 && (
                <p>
                    У Вас еще нет уведомлений, как только они появятся, они
                    будут отображаться тут.
                </p>
            )}

            {notifications}
        </Container>
    );
}
