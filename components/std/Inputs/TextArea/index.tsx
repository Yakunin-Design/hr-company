import styles from "./textarea.module.css";
import Spacer from "@/components/std/Spacer";
import { ChangeEvent } from "react";

type props = {
    name: string,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder?: string,
    label?: string,
};

export default function TextArea(props: props) {
    return (
        <>
            {props.label && (
                <label className={styles.label} htmlFor={props.name}>
                    {props.label}
                </label>
            )}
            <Spacer top={1} />
            <textarea
                className={styles.textarea}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </>
    );
}
