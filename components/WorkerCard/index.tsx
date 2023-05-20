import Link from "next/link";
import Row from "../std/Row";
import Spacer from "../std/Spacer";
import Card from "../Card";
import styles from "./WorkerCard.module.css";
import StatusIcon from "./StatusIcon";

type props = {
	worker_data: {
		_id: string,
		full_name: string,
		specialty: string,
		is_ready: boolean,
		logo: string
	},
	modifyer?: "reviews" | "something"
}

export default function WorkerCard(props: props){
	const full_name = props.worker_data.full_name.split(" ");
	const initials = full_name[0][0] + full_name[1][0];

	const status_text = props.worker_data.is_ready ? "Готов работать" : "Не готов работать";

    return (
        <Link href={"/worker/" + props.worker_data._id} className={styles.link}>
            <Card className={styles.card}>
				<p className={styles.initials}>{initials}</p>
				<Spacer top="1"/>
				<h3 className={styles.name}>{props.worker_data.full_name}</h3>
				<p>{props.worker_data.specialty}</p>
				<Spacer top="2"/>
				<Row gap={.5}>
					<StatusIcon is_ready={props.worker_data.is_ready} />
					<h4>{status_text}</h4>
				</Row>
            </Card>
        </Link>
    )
}
