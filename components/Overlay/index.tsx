import Avatar from "../Avatar";
import Card from "../Card";
import CloseIcon from "../CloseIcon";
import style from "./overlay.module.css";
import Image from "next/image";

type props = {
    children: React.ReactNode;
    href: string;
    bg?: boolean;
    avatar?: string;
};

export default function Overlay(props: props) {
    let className = style.overlay_card;

    if (props.bg) {
        className += " " + style.overlay_bg;
    }

    if (props.avatar) {
        className += " " + style.avatar;
    }

    return (
        <div className={style.overlay}>
            {props.avatar &&
                (props.avatar == "empty" ? (
                    <div className={style.logo}></div>
                ) : (
                    //@ts-ignore
                    <Image
                        src={props.avatar}
                        className={style.logo}
                        width={63}
                        height={63}
                        alt="logo"
                    />
                ))}
            <Card className={className}>{props.children}</Card>
            <CloseIcon overlay href={props.href} />
        </div>
    );
}
