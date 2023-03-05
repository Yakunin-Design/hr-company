import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import time_span from "@/assets/svg/time_span.svg";

import Image from "next/image";

export default function Add() {
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
            <Row>
                <div>
                    <h3>Начало работы</h3>
                    <Spacer top="1" />
                </div>
                <Image src={time_span} alt="time_span" />
                <div></div>
            </Row>
        </Card>
    );
}
