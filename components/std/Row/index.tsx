import styles from "./row.module.css";

type props = {
    children: React.ReactNode;
    onClick?: () => void;
    align?: "start" | "end";
    className?: string;
};

export default function Row(props: props) {
    let row_styles = styles.row;

    // Css align items; default is center
    if (props.align === "start") row_styles += " " + styles.start;
    if (props.align === "end") row_styles += " " + styles.end;

    // custom className
    if (props.className) {
        row_styles += " " + props.className;
    }

    return (
        <div className={row_styles} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
