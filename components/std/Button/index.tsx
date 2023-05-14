import styles from "./button.module.css";

type props = {
    children: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    expand?: boolean;
    common?: boolean;
    className?: string;
    red?: boolean;
};

export default function Button(props: props) {
    let button_styles = styles.primary;

    if (props.secondary) {
        button_styles = styles.secondary;
    }

    if (props.common) {
        button_styles = styles.common;
    }

    if (props.red) {
        button_styles += " " + styles.red;
    }

    if (props.expand) {
        button_styles += " " + styles.expand;
    }

    if (props.className) {
        button_styles += " " + props.className;
    }

    return (
        <button className={button_styles} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
