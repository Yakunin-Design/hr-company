import styles from "./input.module.css";
import Spacer from "@/components/std/Spacer";
import { CSSProperties } from "react";

type props = {
    name: string;
    onChange: (event: any) => void;
    placeholder?: string;
    label?: string;
    value?: string;
    className?: string;
    maxLength?: number;
    style?: CSSProperties;
    options: Array<String>;
};

export default function Select(props: props) {
    const options: Array<any> = [];
    props.options.map(opt => {
        const value = opt;
        //const value = options.length < 8 ? `0${options.length}` : options.length;
        // .toString() was added
        options.push(
            <option value={value.toString()} key={options.length}>
                {opt}
            </option>
        );
    });

    return (
        <>
            {props.label && (
                <>
                    <label className={styles.label} htmlFor={props.name}>
                        <h3>{props.label}</h3>
                    </label>
                    <Spacer top={1} />
                </>
            )}

            <select
                className={
                    props.className
                        ? styles.input + " " + props.className
                        : styles.input
                }
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                style={props.style ? props.style : {}}
            >
                {options.map(option => option)}
            </select>
        </>
    );
}
