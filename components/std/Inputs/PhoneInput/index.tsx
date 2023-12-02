import styles from "./input.module.css";
import Spacer from "@/components/std/Spacer";
import { CSSProperties } from "react";

type props = {
    name: string;
    onChange: (event: any) => void;
    placeholder?: string;
    label?: string;
    value?: string | number;
    className?: string;
    style?: CSSProperties;
};

export default function PhoneInput(props: props) {
    function phone_change(event: React.ChangeEvent<HTMLInputElement>) {
        let value = String(event.target.value);
        const now_data = String(props.value);
        value = value.trim();

        if (/[a-zа-яё]/i.test(value.slice(-1))) {
            value = value.slice(0, -1);
        }

        if (value.length > now_data.length) {
            if (now_data === "") {
                if (value.slice(-1) == "7") value = "+7 (";
                if (value.slice(-1) == "8") value = "+7 (";
                if (value.slice(-1) == "+") value = "+";
            }

            if (now_data === "+") {
                if (value.slice(-1) == "7") value = "+7 (";
            }

            if (value.substring(0, 4) == "+7 (") {
                if (value.length == 7) {
                    value += ")";
                }
                if (value.length == 12 || value.length == 15) {
                    value += " ";
                }
                if (value.length > 18) {
                    value = value.substring(0, 18);
                }

                if (value.length == 9) {
                    value = value.substring(0, 8) + " " + value.slice(-1);
                }
            }
        } else {
            if (now_data.length == 16) {
                value = value = value.substring(0, 15);
            }
            if (now_data.length == 12) {
                value = value = value.substring(0, 11);
            }
        }

        event.target.value = value;
        props.onChange(event);
    }

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
                type={"tel"}
                placeholder={props.placeholder}
                onChange={phone_change}
                value={props.value}
                style={props.style ? props.style : {}}
            />
        </>
    );
}
