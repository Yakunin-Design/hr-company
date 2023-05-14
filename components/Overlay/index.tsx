import Card from "../Card";
import CloseIcon from "../CloseIcon";
import style from "./overlay.module.css"

type props = {
    children: React.ReactNode;
    href: string,
    bg?: boolean,
}

export default function Overlay(props: props) {
    return (
        <div className={style.overlay}>
            <Card className={props.bg ? style.overlay_bg + " " +style.overlay_card : style.overlay_card}>
                {props.children}
            </Card>
            <CloseIcon overlay href={props.href}/>
        </div>
    )
}