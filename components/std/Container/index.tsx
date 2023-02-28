import React from "react";
import styles from "./container.module.css";

type props = {
    children: React.ReactNode;
    wrapper?: boolean;
    className?: string;
    lk?: boolean;
};

export default function Container(props: props) {
    let container_styles;

    if (props.wrapper) {
        container_styles = styles.wrapper;
    } else {
        container_styles = styles.container;
    }

    if (props.className) {
        container_styles += " " + props.className;
    }

    return props.lk ? (
        <div className={styles.lk}>
            <div className={container_styles}>{props.children}</div>
        </div>
    ) : (
        <div className={container_styles}>{props.children}</div>
    );
}
