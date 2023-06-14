import styles from "./AddressPlate.module.css";
import Card from "@/components/Card";
import Row from "@/components/std/Row";
import PositionsIndicator from "@/components/smp/PositionsIndicator";

type props = {
	school: string,
	address: string,
	subway?: string,
	positions?: number,
	available?: number,
};

export default function AddressPlate(props: props) {

    return (
		<Card>
			<Row>
				<div>
					<h3>{props.school}</h3>
					<p>{props.address}</p>
				</div>	
				<PositionsIndicator
					positions={5}
					available={3}
				/>
			</Row>
		</Card>
	)
}
