import Image from "next/image";
import Row from "@/components/std/Row";
import styles from "./PositionsIndicator.module.css";
import position_icon from "./position_icon.svg";

type props = {
	positions: number,
	available?: number,
};

export default function PositionsIndicator(props: props) {
    return (
		<Row>
			<Image 
				src={position_icon}
				alt="person icon"
			/>
			<div>{props.positions}</div>
		</Row>
	)
}
