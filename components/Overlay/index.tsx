import Card from "../Card";
import CloseIcon from "../CloseIcon";
import style from "./overlay.module.css"

type props = {
    children: React.ReactNode;
}

export default function Overlay(props: props) {
    return (
        <div className={style.overlay}>
            <Card className={style.overlay_card}>
                {props.children}
            </Card>
            <CloseIcon overlay href="/lk/points"/>
        </div>
    )
}