import styles from "./button.module.css";

type props = {
    children: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    expand?: boolean;
};

export default function Button(props: props) {
    let button_styles = styles.primary;

    if (props.secondary) {
        button_styles = styles.secondary;
    }

    if (props.expand) {
        button_styles += " " + styles.expand;
    }

    return (
        <button className={button_styles} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
