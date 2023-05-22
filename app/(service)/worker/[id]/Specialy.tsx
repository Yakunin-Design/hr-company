import Card from "@/components/Card";
import Row from "@/components/std/Row";

import style from "./worker.module.css";
import Spacer from "@/components/std/Spacer";

type props = {
    specialties: string[]
}

export default function Specialty(props: props) {
    const specialties = props.specialties.map(text => <Card className={style.plate}><h4>{text}</h4></Card>);

    return (
        <>
            <Spacer top="2"/>
            <p className={style.label}>Специальности</p>
            <Row gap={1}>{specialties}</Row>
        </>
    )
}