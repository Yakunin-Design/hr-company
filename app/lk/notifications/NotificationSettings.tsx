import Card from "@/components/Card";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import { cookies } from "next/headers";

async function get_user_id() {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    const db_id = await axios.get(
        `${process.env.API_ADDRESS}/find-user`,
        config
    );

    return db_id.data;
}

export default async function NotificationSettings() {
    const user = await get_user_id();

    return (
        <>
            <h2>Настройки уведомлений</h2>
            <Card>
                <Row>
                    <h3>Telegram</h3>
                    <a
                        href={`https://t.me/yd_whisperer_bot?start=${user.id}`}
                        target="_blank"
                    >
                        <Button>Подключить</Button>
                    </a>
                </Row>
            </Card>
            <Spacer top={2} />
        </>
    );
}
