"use client";
import Card from "@/components/Card";
import IconButton from "@/components/IconButton";
import Button from "@/components/std/Button";
import Container from "@/components/std/Container";
import Input from "@/components/std/Inputs/Input";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function NewCient() {
    const [client_data, set_client_data] = useState({
        name: "",
        password: "",
        inn: "",
        city: "Санкт-Петербург",
        contact_name: "",
        contact_number: "",
    });
    const [is_disabled, set_is_disabled] = useState(true);

    function handle_change(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        set_is_disabled(false);

        const { name, value } = event.target;
        set_client_data(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function send_to_api() {
        const data = client_data;

        const jwt = localStorage.getItem("jwt") || "";
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(`${process.env.API_ADDRESS}/new-client`, data, config)
            .then(res => (window.location.href = "/lk/clients"));
    }
    return (
        <Container wrapper lk>
            <Spacer top={2} />
            <Link href="/lk/clients">
                <IconButton icon="back" />
            </Link>
            <Spacer top={1} />
            <h2>Добавить клиента</h2>
            <Card>
                <Input
                    name="name"
                    label="Имя клиента"
                    onChange={handle_change}
                    value={client_data.name}
                />
                <Spacer top={1} />
                <Input
                    name="city"
                    label="Город"
                    onChange={() => console.log("city")}
                    value={client_data.city}
                />
                <Spacer top={1} />
                <Input
                    name="password"
                    label="Пароль"
                    onChange={handle_change}
                    value={client_data.password}
                />
                <Spacer top={1} />
                <Input
                    name="inn"
                    label="ИНН"
                    onChange={handle_change}
                    value={client_data.inn}
                />
                <Spacer top={1} />
                <Input
                    name="contact_name"
                    label="Контактное лицо"
                    onChange={handle_change}
                    value={client_data.contact_name}
                />

                <Spacer top={1} />
                <Input
                    name="contact_number"
                    label="Номер телефона"
                    onChange={handle_change}
                    value={client_data.contact_number}
                />
                <Spacer top={3} />

                <Button expand disabled={is_disabled} onClick={send_to_api}>
                    Сохранить
                </Button>
            </Card>
        </Container>
    );
}
