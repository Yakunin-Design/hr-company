import styles from "./AddressPlate.module.css";
import Card from "@/components/Card";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Subway from "@/components/Subway";
import PositionsIndicator from "@/components/smp/PositionsIndicator";

type props = {
	school: string,
	address: string,
	subway?: string,
	positions: number,
	available: number,
};

export default function AddressPlate(props: props) {
    return (
		<Card className={styles.card}>
			<Row>
				<div>
					<h3>{props.school}</h3>
					{props.subway && <>
						<Spacer top={1} />
						<Subway station={props.subway}/>
					</>}
					<p>{props.address}</p>
				</div>	
				<PositionsIndicator
					positions={props.positions}
					available={props.available}
				/>
			</Row>
		</Card>
	)
}
