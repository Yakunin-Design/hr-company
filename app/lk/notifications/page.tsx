import axios from "axios";
import { cookies } from "next/headers";

import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Notification from "./Notification";

type notification = {
    text: string;
    timestamp: string;
    user_id: string;
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

    const notifications = data.map((noti: notification) =>
        Notification({
            text: noti.text,
            timestamp: noti.timestamp,
            icon: "warn",
        })
    );

    return (
        <Container lk wrapper>
            <Spacer top={2} />
            <h2>Уведомления</h2>

            {notifications}
        </Container>
    );
}
