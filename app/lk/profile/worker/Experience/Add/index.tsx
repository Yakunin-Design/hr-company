import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Select from "@/components/std/Inputs/Select";

import time_span from "@/assets/svg/time_span.svg";

import Image from "next/image";

import style from "./add.module.css";

type Props = {
    edit_errors: Array<string>;
    handle_change: (event: any) => void;
};

const error_style = {
    border: "2px solid red",
};

export default function Add(props: Props) {
    const options = [
        "Месяц",
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];

    return (
        <Card>
            <Input
                name="title"
                onChange={props.handle_change}
                placeholder="Повар горячего цеха"
                label="Должность"
                value=""
            />

            <Spacer top="2" />
            <Input
                name="employer"
                onChange={props.handle_change}
                label="Работадатель"
                value=""
            />

            <Spacer top="2" />
            <TextArea
                name="description"
                onChange={props.handle_change}
                placeholder="Опишите ваши обязанности, объем работы и задачи"
                label="Какими были ваши обязательства"
                value=""
            />

            <Spacer top="2" />
            <Row className={style.time}>
                <div className={style.time_block}>
                    <h3>Начало работы</h3>
                    <Spacer top="1" />
                    <Row className={style.period_row}>
                        <Select
                            name="start_month"
                            onChange={props.handle_change}
                            value=""
                            options={options}
                            className={style.month}
                            style={
                                props.edit_errors.includes("start_month")
                                    ? error_style
                                    : {}
                            }
                        />
                        <Input
                            name="start_year"
                            placeholder="0000"
                            type="tel"
                            onChange={props.handle_change}
                            maxLength={4}
                            className={style.year}
                            style={
                                props.edit_errors.includes("start_year")
                                    ? error_style
                                    : {}
                            }
                        />
                    </Row>
                </div>
                <Image
                    src={time_span}
                    alt="time_span"
                    className={style.time_span}
                />
                <div className={style.time_block}>
                    <h3>Окончание работы</h3>
                    <Spacer top="1" />
                    <Row className={style.period_row}>
                        <Select
                            name="end_month"
                            onChange={props.handle_change}
                            value=""
                            options={options}
                            className={style.month}
                            style={
                                props.edit_errors.includes("end_month")
                                    ? error_style
                                    : {}
                            }
                        />
                        <Input
                            name="end_year"
                            placeholder="0000"
                            type="tel"
                            onChange={props.handle_change}
                            maxLength={4}
                            className={style.year}
                            style={
                                props.edit_errors.includes("end_year")
                                    ? error_style
                                    : {}
                            }
                        />
                    </Row>
                </div>
            </Row>
        </Card>
    );
}
