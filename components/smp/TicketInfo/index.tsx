import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import Padding from "@/components/std/Padding";
import Container from "@/components/std/Container";
import styles from "./TicketInfo.module.css";
import StatusIcon from "./StatusIcon";
import ProgressBar from "../ProgressBar";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import { convert_status, ticket_status } from "@/types/ticket_status";
import ActivateTicketButton from "./ActivateTicketButton";
import unwrap from "@/functions/unwrap";
import { cookies } from "next/headers";

type props = {
    id: string;
    accepted: number;
    total_workers_count: number;
    status: ticket_status;
    realization_date: string;
    description?: string;
};

export default function TicketInfo(props: props) {
    // for not only 2 icons are available
    const status = props.status;
    const icon = props.status !== "pending" ? true : false;
    const status_text = convert_status(status);

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

    const title =
        "Заяка №" +
        props.id.slice(-7) +
        " (" +
        props.total_workers_count +
        ") чел";

    return (
        <div className={styles.info_block}>
            <Container>
                <Padding vertical={3} horisontal={1}>
                    <Link href={"/tickets"}>
                        <IconButton icon="back" />
                    </Link>
                    <Spacer top={1} />
                    <h2>{title}</h2>
                    <Spacer top={1} />
                    <ProgressBar
                        progress={props.accepted}
                        goal={props.total_workers_count}
                        light
                    />
                    <Spacer top={2} />
                    <Row>
                        <Row gap={0.5}>
                            <StatusIcon is_ready={icon} />
                            <p>{status_text}</p>
                        </Row>
                        {status === "pending" && (
                            <ActivateTicketButton ticket_id={props.id} />
                        )}
                    </Row>
                    <Spacer top={1} />
                    <p>Дата реализации {display_date}</p>
                    <Spacer top={1} />
                    <p>{props.description}</p>
                </Padding>
            </Container>
        </div>
    );
}
