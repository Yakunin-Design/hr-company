import styles from "./index.module.css";
import Spacer from "@/components/std/Spacer";
import Image from "next/image";
import checked_icon from "./check.svg";

type props = {
    onChange: () => void;
    checked?: boolean;
};

export default function TouCheckbox(props: props) {
    return (
        <>
            <input
                type="checkbox"
                name="tou"
                id="tou"
                onChange={props.onChange}
                checked={props.checked ? true : false}
                className={styles.input}
            />
            <label htmlFor="tou">
                <div className={styles.tou}>
                    {props.checked && (
                        <Image src={checked_icon} alt="checked" />
                    )}
                </div>
            </label>
        </>
    );
}
