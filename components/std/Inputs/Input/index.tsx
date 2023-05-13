import styles from "./input.module.css";
import Spacer from "@/components/std/Spacer";
import { CSSProperties } from "react";

type props = {
    name: string;
    onChange: (event: any) => void;
    type?: "tel" | "email";
    placeholder?: string;
    label?: string;
    value?: string | number;
    className?: string;
    maxLength?: number;
    style?: CSSProperties;
    list?: string;
    disabled?: boolean;
};

export default function Input(props: props) {
    return (
        <>
            {props.label && (
                <label className={styles.label} htmlFor={props.name}>
                    {props.label}
                </label>
            )}
            <Spacer top={1} />
            <input
                className={
                    props.className
                        ? styles.input + " " + props.className
                        : styles.input
                }
                id={props.name}
                name={props.name}
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                maxLength={props.maxLength}
                style={props.style ? props.style : {}}
                list={props.list}
                disabled={props.disabled}
            />
        </>
    );
}
