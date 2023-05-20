import styles from './column.module.css';

type props = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function Column(props: props) {
    return (
        <div className={styles.column} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
