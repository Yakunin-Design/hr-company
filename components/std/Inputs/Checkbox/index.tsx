import styles from "./checkbox.module.css";
// css interface
import { CSSProperties } from "react";

type props = {
    name: string;
    value: string;
    onChange: (event: any) => void;
    children: React.ReactNode;

    className?: string;
    style?: CSSProperties;
    lk?: boolean;
    checked?: boolean;
};

export default function Checkbox(props: props) {
    let className = styles.label;
    if (props.className) className += " " + props.className;

    return (
        <>
            <label
                className={className}
                htmlFor={props.value}
                style={props.style ? props.style : {}}
            >
                {props.children}
            </label>
            <input
                className={styles.input}
                id={props.value}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                type="checkbox"
            />
        </>
    );
}
