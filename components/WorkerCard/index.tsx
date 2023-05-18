import Link from "next/link";
import Image from "next/image";
import Row from "../std/Row";
import Spacer from "../std/Spacer";
import Card from "../Card";
import styles from "./WorkerCard.module.css";

import ready_icon from "./icons/ready.svg";
import not_ready_icon from "./icons/not_ready.svg";

type props = {
	worker_data: {
		id: string,
		name: string,
		specialty: string,
		is_ready: boolean
	},
	modifyer?: "reviews" | "something"
}

export default function WorkerCard(props: props){
	const full_name = props.worker_data.name.split(" ");
	const initials = full_name[0][0] + full_name[1][0];

	const icon_path = props.worker_data.is_ready ? ready_icon : not_ready_icon;
	const status_text = props.worker_data.is_ready ? "Готов работать" : "Не готов работать";

    return (
        <Link href={"/worker/" + props.worker_data.id}>
            <Card className={styles.card}>
				<p className={styles.initials}>{initials}</p>
				<Spacer top="1"/>
				<h3 className={styles.name}>{props.worker_data.name}</h3>
				<p>{props.worker_data.specialty}</p>
				<Spacer top="2"/>
				<Row className={styles.status}>
					<Image
						src={icon_path}
						alt="status icon"
						width={14}
						height={14}
					/>
					<h4>{status_text}</h4>
				</Row>
            </Card>
        </Link>
        
    )
}
