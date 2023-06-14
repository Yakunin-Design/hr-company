import Image from "next/image";
import Row from "@/components/std/Row";
import styles from "./PositionsIndicator.module.css";
import position_icon from "./position_icon.svg";

type props = {
	positions: number,
	available?: number,
	light?: boolean,
};

export default function PositionsIndicator(props: props) {
	const counter_text = props.available 
		? props.available + " из " + props.positions
		: props.positions;

	const indicator_styles = props.light
		? styles.indicator + " " + styles.light
		: styles.indicator

    return (
		<Row gap={.5} className={indicator_styles}>
			<Image 
				src={position_icon}
				alt="person icon"
			/>
			<p>{counter_text}</p>
		</Row>
	)
}
