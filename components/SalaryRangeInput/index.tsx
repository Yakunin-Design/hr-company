// "use client";
import Input from "../std/Inputs/Input";
import Row from "../std/Row";
import Spacer from "../std/Spacer";
import styles from "./salary_range_input.module.css";

type props = {
    salary?: {
        amount: number;
        period: string;
    };
    handle_change: (event: any) => void;
};

export default function SalaryRangeInput(props: props) {
    function get_period() {
        if (!props.salary) {
            return "час";
        }

        if (props.salary.period === "hour") return "час";
        if (props.salary.period === "month") return "месяц";
        if (props.salary.period === "day") return "смену";
    }

    function get_min_range() {
        if (!props.salary) {
            return "час";
        }

        if (props.salary.period === "hour") return 50;
        if (props.salary.period === "month") return 15000;
        if (props.salary.period === "day") return 500;
    }

    function get_max_range() {
        if (!props.salary) {
            return "час";
        }

        if (props.salary.period === "hour") return 1000;
        if (props.salary.period === "month") return 150000;
        if (props.salary.period === "day") return 5000;
    }

    function get_labels() {
        if (!props.salary) {
            return "час";
        }

        if (props.salary.period === "hour")
            return (
                <Row>
                    <h4>50</h4>
                    <h4>100</h4>
                    <h4>200</h4>
                    <h4>300</h4>
                    <h4>400</h4>
                    <h4>500</h4>
                    <h4>600</h4>
                    <h4>700</h4>
                    <h4>800</h4>
                    <h4>900</h4>
                    <h4>{">1000"}</h4>
                </Row>
            );
        if (props.salary.period === "month")
            return (
                <Row>
                    <h4>15000</h4>
                    <h4>30000</h4>
                    <h4>45000</h4>
                    <h4>60000</h4>
                    <h4>75000</h4>
                    <h4>90000</h4>
                    <h4>105000</h4>
                    <h4>120000</h4>
                    <h4>135000</h4>
                    <h4>{">150000"}</h4>
                </Row>
            );
        if (props.salary.period === "day")
            return (
                <Row>
                    <h4>500</h4>
                    <h4>1000</h4>
                    <h4>1500</h4>
                    <h4>2000</h4>
                    <h4>2500</h4>
                    <h4>3000</h4>
                    <h4>3500</h4>
                    <h4>4000</h4>
                    <h4>4500</h4>
                    <h4>{">5000"}</h4>
                </Row>
            );
    }

    const period = get_period();
    const min_range = get_min_range();
    const max_range = get_max_range();

    return (
        <>
            <div>
                <h3>
                    Ставка в <u>{period}</u>, ₽
                </h3>
                <select
                    name="period"
                    onChange={props.handle_change}
                    className={styles.period_select}
                    value={props.salary?.period}
                >
                    <option value="hour">Час</option>
                    <option value="month">Месяц</option>
                    <option value="day">Смену</option>
                </select>

                <Input
                    name="amount"
                    placeholder="000"
                    type="tel"
                    value={props.salary?.amount}
                    onChange={props.handle_change}
                    className={styles.amount_input}
                />
            </div>
            <Spacer top="2" />

            <div className={styles.graph_input}>
                <input
                    type="range"
                    name="amount"
                    className={styles.range}
                    onChange={props.handle_change}
                    min={min_range}
                    max={max_range}
                />
                {get_labels()}
            </div>
        </>
    );
}
