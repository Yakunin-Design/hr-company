import styles from "./input.module.css";
import plus_icon from "@/assets/svg/icon-plus.svg";

import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";

import { CSSProperties } from "react";
import Image from "next/image";

type props = {
    name: string;
    onChange: (event: any) => void;
    className?: string;
    value?: string;
};

export default function PhotoInput(props: props) {
    return (
        <>
            <input
                className={styles.input}
                id={props.name}
                type="file"
                name={props.name}
                accept="image/*"
                onChange={props.onChange}
            />
            <label htmlFor={props.name} className={styles.label}>
                <Row className={styles.row}>
                    <div className={styles.photo}>
                        {props.value && props.value != "" ? (
                            <Image
                                src={props.value}
                                alt={props.name}
                                className={styles.logo}
                                width={500}
                                height={500}
                            />
                        ) : (
                            <Image
                                src={plus_icon}
                                alt={props.name}
                                className={styles.add}
                            />
                        )}
                    </div>

                    <h3 className={styles.logo_text}>Загрузить фото</h3>
                </Row>
            </label>
        </>
    );
}
