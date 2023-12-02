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
import SubwayInput from "@/components/std/Inputs/SubwayInput";
import Select from "@/components/std/Inputs/Select";

export default function NewSchool() {
    const [school_data, set_school_data] = useState({
        school_name: "",
        school_number: "",
        city: "Санкт-Петербург",
        subway: "",
        address: "",
        contact_name: "",
        contact_number: "",
    });
    const [is_disabled, set_is_disabled] = useState(true);

    function handle_change(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        set_is_disabled(false);

        const { name, value } = event.target;
        set_school_data(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function send_to_api() {
        const data = school_data;

        const jwt = localStorage.getItem("jwt") || "";
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(`${process.env.API_ADDRESS}/new-school`, data, config)
            .then(res => (window.location.href = "/lk/schools"));
    }

    return (
        <Container lk wrapper>
            <Spacer top={2} />

            <Link href="/lk/schools">
                <IconButton icon="back" />
            </Link>
            <Spacer top={1} />
            <h2>Добавление адреса</h2>
            <Card>
                <Input
                    name="school_name"
                    label="Название ОУ*"
                    onChange={handle_change}
                    value={school_data.school_name}
                />
                <Spacer top={1} />

                <Input
                    name="school_number"
                    label="Номер ОУ"
                    placeholder="777"
                    type="tel"
                    onChange={handle_change}
                    value={school_data.school_number}
                />
                <Spacer top={1} />

                <Select
                    name="city"
                    label="Город*"
                    onChange={handle_change}
                    value={school_data.city}
                    options={["Санкт-Петербург", "Москва"]}
                />
                <Spacer top={1} />

                <SubwayInput
                    value={school_data.subway}
                    onChange={handle_change}
                    label="Метро*"
                />
                <Spacer top={1} />

                <Input
                    name="address"
                    label="Адрес*"
                    onChange={handle_change}
                    value={school_data.address}
                />

                <Spacer top={1} />
                <Input
                    name="contact_name"
                    label="Контактное лицо"
                    onChange={handle_change}
                    value={school_data.contact_name}
                />

                <Spacer top={1} />
                <Input
                    name="contact_number"
                    label="Номер телефона"
                    onChange={handle_change}
                    value={school_data.contact_number}
                />
                <Spacer top={3} />

                <Button expand disabled={is_disabled} onClick={send_to_api}>
                    Сохранить
                </Button>
            </Card>
            <Spacer top={4} />
        </Container>
    );
}
