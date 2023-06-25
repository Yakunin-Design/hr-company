import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import styles from "./TicketPlate.module.css";
import StatusIcon from "./StatusIcon";
import ProgressBar from "../ProgressBar";
import Card from "@/components/Card";
import Link from "next/link";

type props = {
    id: string;
	accepted: number,
	total_workers_count: number,
    status: "active" | "inactive";
	realization_date: string,
};

export default function TicketPlate(props: props) {
    // for not only 2 icons are available
    const icon = props.status === "active" ? true : false;

    const status_text =
        props.status === "active" ? "Заявка активна" : "Заявка закрыта";
    const title = "Заяка №" + props.id.slice(-7) + " (" + props.total_workers_count + ") чел";

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
                    <StatusIcon is_ready={icon} />
                    <p>{status_text}</p>
                </Row>
                <p>Дата реализации {props.realization_date}</p>
            </Card>
        </Link>
    );
}
