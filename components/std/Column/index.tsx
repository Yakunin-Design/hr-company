import styles from "./column.module.css";

type props = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export default function Column(props: props) {
    const className = props.className
        ? props.className + " " + styles.column
        : styles.column;
    return (
        <div className={styles.column} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
