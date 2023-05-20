import { RefObject } from "react";
import styles from "./input.module.css";

type props = {
    name: string;
    onChange: (event: any) => void;
    value: string | number;
}

export default function ConfirmInput(props: props) {
    return (
        <div className={styles.block}>
            <input 
            type="tel"
            placeholder="0"
            maxLength={1}
            onChange={props.onChange}
            value={props.value}
            className={styles.input}
            id={props.name}
            name={props.name}
            />
            <div className={styles.underline}></div>
        </div>
    );
}
