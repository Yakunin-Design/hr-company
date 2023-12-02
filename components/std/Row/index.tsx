import styles from "./row.module.css";

type props = {
    children: React.ReactNode;
    gap?: number;
    justifyContent?:
        | "flex-start"
        | "flex-end"
        | "space-between"
        | "space-around";
    onClick?: () => void;
    align?: "start" | "end";
    className?: string;
    title?: string;
};

export default function Row(props: props) {
    let row_styles = "";
    // custom className
    if (props.className) {
        row_styles += " " + props.className;
    }

    // if you provide a gap prop, content will be justifyed as flex start automatically
    const style = {
        gap: (props.gap || 0) + "rem",
        justifyContent: props.gap ? "flex-start" : "space-between",
    };

    // if justify content is specified, set it
    if (props.justifyContent) {
        style.justifyContent = props.justifyContent;
    }

    // Css align items; default is center
    if (props.align === "start") row_styles += " " + styles.start;
    if (props.align === "end") row_styles += " " + styles.end;

    row_styles += " " + styles.row;

    return (
        <div
            className={row_styles}
            onClick={props.onClick}
            title={props.title}
            style={style}
        >
            {props.children}
        </div>
    );
}
