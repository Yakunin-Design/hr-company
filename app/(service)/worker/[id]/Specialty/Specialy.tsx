import Card from "@/components/Card";

import style from "./Specialty.module.css";
import Spacer from "@/components/std/Spacer";

type props = {
    specialties: string[]
}

export default function Specialty(props: props) {
    const specialties = props.specialties.map(text => 
        <Card className={style.specialty}>
            <h4 className="--cd">{text}</h4>
        </Card>
    );

    return (
        <>
            <Spacer top={2} />
            <p className={style.label}>Специальности</p>
            <Spacer top={1} />
            <div className={style.grid}>{specialties}</div>
        </>
    )
}