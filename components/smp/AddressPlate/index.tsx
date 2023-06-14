import styles from "./AddressPlate.module.css";
import Card from "@/components/Card";

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
			<h3>{props.school}</h3>
			<p>{props.address}</p>
		</Card>
	)
}
