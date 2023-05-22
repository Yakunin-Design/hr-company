import Image from "next/image";
import Spacer from "@/components/std/Spacer";
import Padding from "@/components/std/Padding";
import Row from "@/components/std/Row";
import Card from "@/components/Card";

import star_icon from "./star_icon.svg";
import style from "../worker.module.css";

type props = {	
	rating: number,
	review_count: number
}

export default function RatingPlate(props: props) {
    return (
		<Card className={style.plate}>
			<Row>
				<Row gap={1}>
					<Image
						src={star_icon}
						alt="star icon"
					/>
					<h3>{props.rating}</h3>
				</Row>
				<p>{props.review_count} отзывов</p>
			</Row>
		</Card>
    )
}
