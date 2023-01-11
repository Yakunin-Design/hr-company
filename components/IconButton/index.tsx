import Image from "next/image";

import plus_icon from "./floating_plus.svg";
import back_icon from "./back-arrow.svg";

import styles from "./icon_button.module.css";

type props = {
    icon: "plus" | "back",
    onClick?: () => void
};

export default function IconButton(props: props) {
    const icon = props.icon === "back" ? back_icon : plus_icon;

    return (
        <div className={styles.btn} onClick={props.onClick}>
            <Image src={icon} alt={props.icon} className={styles.image}/>
        </div>
    );
}
