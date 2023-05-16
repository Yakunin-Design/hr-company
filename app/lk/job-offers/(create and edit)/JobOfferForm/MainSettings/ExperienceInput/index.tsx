// "use client";
import Row from "@/components/std/Row";
import styles from "./salary_range_input.module.css";
import Input from "@/components/std/Inputs/Input";
import Spacer from "@/components/std/Spacer";

type props = {
    experience: string;
    handle_change: (event: any) => void;
};

export default function SalaryRangeInput(props: props) {

    function get_labels() {
            return (
                <Row>
                    <h4>0</h4>
                    <h4>1</h4>
                    <h4>2</h4>
                    <h4>3</h4>
                    <h4>4</h4>
                    <h4>5</h4>
                    <h4>{">5"}</h4>
                </Row>
            );
    }

    const min_range = 0;
    const max_range = 6;

    return (
        <>
            <div>
                <h3>
                    Стаж работы, г.
                </h3>
                <Input
                    name="experience"
                    placeholder="0"
                    type="tel"
                    value={props.experience}
                    onChange={props.handle_change}
                    className={styles.amount_input}
                />
            </div>
            <Spacer top="2" />

            <div className={styles.graph_input}>
                <input
                    type="range"
                    name="experience"
                    className={styles.range}
                    onChange={props.handle_change}
                    min={min_range}
                    max={max_range}
                    value={props.experience != "" ? props.experience : 0}
                />
                {get_labels()}
            </div>
        </>
    );
}
