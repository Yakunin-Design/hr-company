import Spacer from "@/components/std/Spacer";
import styles from "./ProgressBar.module.css";

type props = {
    progress: number;
    goal: number;
    light?: boolean;
};

function calculate_progress_procent(progress: number, goal: number): number {
    return Math.round((progress / goal) * 100);
}

export default function ProgressBar(props: props) {
    const procent = calculate_progress_procent(props.progress, props.goal);
    const text = props.progress + " из " + props.goal + " (" + procent + "%)";

    const progress_length = {
        width: procent + "%",
    };

    const bar_style = props.light
        ? styles.bar + " " + styles.light
        : styles.bar;

    return (
        <div>
            <h3>{text}</h3>
            <Spacer top={1} />
            <div className={bar_style}>
                <div className={styles.progress} style={progress_length}></div>
            </div>
        </div>
    );
}
