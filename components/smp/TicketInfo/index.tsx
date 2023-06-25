import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import Padding from "@/components/std/Padding";
import Container from "@/components/std/Container";
import styles from "./TicketInfo.module.css";
import StatusIcon from "./StatusIcon";
import ProgressBar from "../ProgressBar";
import IconButton from "@/components/IconButton";
import Link from "next/link";

type props = {
	id: string,
	accepted: number,
	total_workers_count: number,
	status: "active" | "inactive" | "pending",
	realization_date: string,
	description?: string,
};

export default function TicketInfo(props: props) {
	// for not only 2 icons are available
	const status = (props.status === "active" || props.status === "pending") ? true : true;
	const icon = status;
	const status_text = status ? "Заявка активна" : "Заявка закрыта";
    const title = "Заяка №" + props.id.slice(-7) + " (" + props.total_workers_count + ") чел";
	
    return (
		<div className={styles.info_block}>
			<Container>
				<Padding vertical={3} horisontal={1}>
					<Link href={"/tickets"}>
						<IconButton icon="back"/>
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
					<Row gap={.5}>
						<StatusIcon is_ready={icon} />
						<p>{status_text}</p>
					</Row>
					<Spacer top={1} />
					<p>Дата реализации {props.realization_date}</p>
					<Spacer top={1} />
					<p>{props.description}</p>
				</Padding>
			</Container>
		</div>
	)
}
