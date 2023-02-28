"use client";

import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import Button from "@/components/std/Button";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import { useState, ChangeEvent } from "react";

export default function FeedbackForm() {
    const [contact_data, set_contact_data] = useState({
        email: "",
        text: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        set_contact_data(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function send_data() {
        // validation ?
        console.log(contact_data);
    }

    return (
        <div>
            <Input
                name="email"
                label="Ваш e-mail для ответа"
                type="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
            />
            <Spacer top="2" />
            <h3>Ваше сообщение</h3>
            <TextArea
                name="text"
                placeholder="Оставьте нам сообщение"
                onChange={handleChange}
            />
            <Spacer top="2" />
            <Row>
                <div></div>
                <Button onClick={send_data}>Отправить</Button>
            </Row>
        </div>
    );
}
