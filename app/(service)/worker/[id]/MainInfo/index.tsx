import Spacer from "@/components/std/Spacer";
import Padding from "@/components/std/Padding";
import Row from "@/components/std/Row";

import Subway from "@/components/Subway";

import StatusIcon from "./StatusIcon";
import style from "../worker.module.css";

import { main_info } from "../worker_data";

export default function MainInfo(props: main_info) {

	let citizenship_emoji = "?";

	if (props.citizenship === "РФ")	
		citizenship_emoji = "🇷🇺";

	if (props.citizenship === "Беларусь / Украина")	
		citizenship_emoji = "🇧🇾/🇺🇦";

	if (props.citizenship === "СНГ")	
		citizenship_emoji = "";

	if (props.citizenship === "Другое")	
		citizenship_emoji = "";
	
    return (
		<Spacer top={2} bottom={1}>
			<hr/>
			<Spacer top={1}/>
			<Padding className={style.card_padding}>
				<Row>
					<p className={style.label}>Статус</p>
					<Row gap={.5}>
						<StatusIcon is_ready={props.is_ready}/>
						<h3 className={style.title}>{props.is_ready ? "Готов работать" : "Не готов работать"}</h3>
					</Row>
				</Row>

				<Row>
					<p className={style.label}>Занятость</p>
					<h3 className={style.title}>{props.job_type || "Любая"}</h3>
				</Row>
			</Padding>

			<Spacer top={1}/>
			<hr/>
			<Spacer top={1}/>

			<Padding className={style.card_padding}>
				{/*
				<Row>
					<p className={style.label}>Образование</p>
					<h3 className={style.title}>{props.education || "Не указано"}</h3>
				</Row>
				*/}
				<Row>
					<p className={style.label}>Возраст</p>
					<h3 className={style.title}>{props.age} полных лет</h3>
				</Row>
				<Row>
					<p className={style.label}>Гражданство</p>
					<Row gap={.5}>
						<h3 className={style.title}>{citizenship_emoji}</h3>
						<h3 className={style.title}>{props.citizenship}</h3>
					</Row>	
				</Row>
				<Row>
					<p className={style.label}>Город</p>
					<h3 className={style.title}>{props.city || "Не указан"}</h3>
				</Row>
				<Row>
					<p className={style.label}>Метро</p>
					<Subway station={props.subway || "Не указанно"} text_style="h3"/>
				</Row>
			</Padding>
			<Spacer top={1}/>
			<hr/>
		</Spacer>
    )
}
