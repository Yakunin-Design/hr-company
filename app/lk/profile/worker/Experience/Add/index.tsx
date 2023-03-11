import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Select from "@/components/std/Inputs/Select";

import time_span from "@/assets/svg/time_span.svg";

import Image from "next/image";

import style from "./add.module.css";

export default function Add() {
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
                onChange={e => {}}
                placeholder="Повар горячего цеха"
                label="Должность"
                value=""
            />

            <Spacer top="2" />
            <Input
                name="employer"
                onChange={e => {}}
                label="Работадатель"
                value=""
            />

            <Spacer top="2" />
            <TextArea
                name="description"
                onChange={e => {}}
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
                            onChange={e => {}}
                            value=""
                            options={options}
                            className={style.month}
                        />
                        <Input
                            name="start_year"
                            placeholder="0000"
                            type="tel"
                            onChange={e => {}}
                            maxLength={4}
                            className={style.year}
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
                            onChange={e => {}}
                            value=""
                            options={options}
                            className={style.month}
                        />
                        <Input
                            name="end_year"
                            placeholder="0000"
                            type="tel"
                            onChange={e => {}}
                            maxLength={4}
                            className={style.year}
                        />
                    </Row>
                </div>
            </Row>
        </Card>
    );
}
