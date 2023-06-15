import Image from "next/image";
import Row from "@/components/std/Row";
import Card from "@/components/Card";
import styles from "./SchoolManagerPlate.module.css";
import phone_icon from "./phone.svg";

type props = {
	full_name: string,
	phone: string,
	position?: string
};

export default function SchoolManagerPlate(props: props) {
	const tel_link = "tel:" + props.phone;

    return (
		<a href={tel_link} className={styles.plate}>
			<Card className={styles.card}>
				<Row>
					<div>
						<h3>{props.position ? props.position : "Заведующий"}</h3>
						<p>{props.full_name}</p>
					</div>
					<Image 
						src={phone_icon}
						width={17}
						height={17}
						alt="phone icon"
					/>
				</Row>
			</Card>
		</a>
	)
}
