"use client";
import Card from "@/components/Card";
import IconButton from "@/components/IconButton";
import Button from "@/components/std/Button";
import Container from "@/components/std/Container";
import Input from "@/components/std/Inputs/Input";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

type params = {
    id: string;
};

export default function ClientPage({ params }: { params: params }) {
    const [client_data, set_client_data] = useState({
        name: "",
        password: "",
        inn: "",
        city: "Санкт-Петербург",
        contact_name: "",
        contact_number: "",
    });
    const [is_disabled, set_is_disabled] = useState(true);
    const [edited_fileds, set_edited_fields] = useState<string[]>([]);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .get(`${process.env.API_ADDRESS}/clients/${params.id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                set_client_data(res.data);

                setCookie("jwt", jwt);
            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace("/login");
                }
                if (e.response.status === 404) {
                    localStorage.removeItem("jwt");
                    window.location.reload();
                } else {
                    console.log("e is undefined");
                }
            });
    }, []);

    function handle_change(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        set_is_disabled(false);

        const { name, value } = event.target;

        let isUnique = true;
        set_edited_fields(prev => {
            prev.forEach(edit => {
                if (edit === name) isUnique = false;
            });

            if (isUnique) return [...prev, name];
            else return prev;
        });

        set_client_data(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function send_to_api() {
        let data = {};

        edited_fileds.forEach(edit => {
            data = {
                ...data,
                // @ts-ignore
                [edit]: client_data[edit],
            };
        });

        const jwt = localStorage.getItem("jwt") || "";
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/update-client/${params.id}`,
                data,
                config
            )
            .then(res => (window.location.href = "/lk/clients"));

        console.log(data);
    }

    return (
        <Container wrapper lk>
            <Spacer top={2} />
            <Link href="/lk/clients">
                <IconButton icon="back" />
            </Link>
            <Spacer top={1} />
            <h2>Редактирование данных клиента</h2>
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
