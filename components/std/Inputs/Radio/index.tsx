import styles from "./input.module.css";
import { CSSProperties } from "react";

type props = {
    name: string;
    value: string;
    currentValue: string;
    onChange: (event: any) => void;
    children: React.ReactNode;

    className?: string;
    style?: CSSProperties;
};

export default function Input(props: props) {
    let className = styles.label;
    if (props.value == props.currentValue) className += " " + styles.checked;

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
                className={
                    props.className
                        ? styles.input + " " + props.className
                        : styles.input
                }
                id={props.value}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                type="radio"
            />
        </>
    );
}
