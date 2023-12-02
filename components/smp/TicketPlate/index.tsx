import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import styles from "./TicketPlate.module.css";
import StatusIcon from "./StatusIcon";
import ProgressBar from "../ProgressBar";
import Card from "@/components/Card";
import Link from "next/link";
import { ticket_status, convert_status } from "@/types/ticket_status";
import { cookies } from "next/headers";
import unwrap from "@/functions/unwrap";

type props = {
    id: string;
    accepted: number;
    total_workers_count: number;
    status: ticket_status;
    realization_date: string;
};

export default function TicketPlate(props: props) {
    const status_text = convert_status(props.status);
    const title =
        "Заяка №" +
        props.id.slice(-7) +
        " (" +
        props.total_workers_count +
        ") чел";

    const user_time_zone = unwrap(
        cookies().get("user_time_zone")?.value,
        "Europe/Moscow"
    );

    const display_date = new Date(props.realization_date).toLocaleString(
        "ru-RU",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: user_time_zone,
        }
    );

    return (
        <Link href={`/tickets/${props.id}`}>
            <Card className={styles.ticket_plate}>
                <h2 className={styles.headers}>{title}</h2>
                <Spacer top={1} />
                <ProgressBar
                    progress={props.accepted}
                    goal={props.total_workers_count}
                    light
                />
                <Spacer top={2} />
                <Row gap={0.5}>
                    <StatusIcon icon={props.status} />
                    <p>{status_text}</p>
                </Row>
                <p>Дата реализации {display_date}</p>
            </Card>
        </Link>
    );
}
