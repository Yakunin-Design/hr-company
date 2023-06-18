import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import Padding from "@/components/std/Padding";
import Container from "@/components/std/Container";
import styles from "./TicketInfo.module.css";
import StatusIcon from "./StatusIcon.tsx";
import ProgressBar from "../ProgressBar";

type props = {
	title: string,
	progress: number,
	goal: number,
	status: "active" | "inactive",
	created: string,
	description?: string,
};

export default function TicketInfo(props: props) {

	// for not only 2 icons are available
	const icon = props.status === "active" ? true : false;

	const status_text = props.status === "active" ? "Заявка активна" : "Заявка закрыта";
	
    return (
		<div className={styles.info_block}>
			<Container>
				<Padding vertical={5} horisontal={1}>
					<h2>{props.title} ({props.goal}чел)</h2>
					<Spacer top={1} />
					<ProgressBar
						progress={props.progress}
						goal={props.goal}
						light
					/>
					<Spacer top={2} />
					<Row gap={.5}>
						<StatusIcon is_ready={icon} />
						<p>{status_text}</p>
					</Row>
					<Spacer top={1} />
					<p>Создана {props.created}</p>
					<Spacer top={1} />
					<p>{props.description}</p>
				</Padding>
			</Container>
		</div>
	)
}
