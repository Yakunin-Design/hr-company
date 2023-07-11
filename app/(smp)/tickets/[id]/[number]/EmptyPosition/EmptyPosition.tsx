import Card from "@/components/Card";
import Image from "next/image";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import empty_position from "./empty_position.svg";
import style from "./EmptyPosition.module.css";

type props = {
    title: string,
    subtitle: string,
    candidates: number
}

export default function EmptyPosition(props: props) {
    return (
        <Card className={style.empty_position}>
            <Row>
                <div className={style.info}>
                    <Image className={style.icon} src={empty_position} alt="empty position icon" />
                    <Spacer top=".5" />
                    <h3 className={style.empty_headline}>{props.title}</h3>
                    <Spacer top=".05" />
                    <h4 className={style.empty_headline}>{props.subtitle}</h4>
                </div>

                <h4 className={style.empty_headline}>
                    Кандидиты: {props.candidates}
                </h4>
            </Row>
        </Card>
    );
}