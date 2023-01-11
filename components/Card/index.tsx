import styles from "./card.module.css";

type props = {
    children: React.ReactNode;
    className?: string;
};

export default function Card(props: props) {
    const card_styles = props.className
        ? styles.card + " " + props.className
        : styles.card;

    return <div className={card_styles}>{props.children}</div>;
}
