import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Image from "next/image";
import clock from "@/assets/svg/clock.svg"
import get_created_time from "@/functions/get_created_time";
import style from "./jotitle.module.css"
import Button from "@/components/std/Button";
import Actions from "./Actions";

export default function JoTitle({jo_data, user_type}: {jo_data: any, user_type: string}) {
    return (
    <>
        <Spacer top="2"/>
        <h2 className={style.title}>{jo_data.specialty}</h2>
        <Spacer top="1"/>
        <Row className={style.subtitle}>
            <h4>{jo_data.company}</h4>
            <h4 className={style.subtitle_cutter}>|</h4>
            <Row className={style.subtitle_time}>
                <Image src={clock} alt="clock"/>
                <h4>{get_created_time(jo_data.created)}</h4>
            </Row>
        </Row>
        <Actions user_type={user_type} jo_data={jo_data}/>
    </>
    )
}