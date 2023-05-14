import Card from "@/components/Card";
import Experience from "@/types/Experience";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Image from "next/image";

import styles from "./expblock.module.css";

import timeSpan from "@/assets/svg/time_span.svg";

type props = Experience & {
    id: number;
};

export default function ExperienceBlock(props: props) {
    return (
        <Card>
            <Row>
                <span className={styles.employer}>{props.employer}</span>
                {/* <Icon className={styles.close} /> */}
            </Row>

            <Spacer top="2" />
            <h3>{props.title}</h3>
            <Spacer top="1" />
            <p>{props.description}</p>

            <Spacer top="2" />
            <Row className={styles.time_block}>
                <p className={styles.time}>
                    {props.start_month}.{props.start_year}
                </p>
                <Image src={timeSpan} alt="time span" />
                <p className={styles.time}>
                    {props.end_month}.{props.end_year}
                </p>
            </Row>
        </Card>
    );
}
