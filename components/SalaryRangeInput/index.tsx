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
            </div>
        </>
    );
}
