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

type school_data = {
    id: string;
    school_name: string;
    city: string;
    subway: string;
    address: string;
    contact_person: string;
    contact_number: string;
};

export default function SchoolPage({ params }: { params: params }) {
    const [school_data, set_school_data] = useState<any>({});

    useEffect(() => {
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .get(`${process.env.API_ADDRESS}/schools/${params.id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                set_school_data(res.data);

                setCookie("jwt", jwt);

                if (
                    localStorage.getItem("user_type") != "worker" ||
                    localStorage.getItem("user_type") != "employer"
                ) {
                    localStorage.setItem(
                        "user_type",
                        res.data.specialty ? "worker" : "employer"
                    );
                }
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

    function handle_change() {
        console.log("some changes...");
    }

    return (
        <Container lk wrapper>
            <Spacer top={2} />

            <Link href="/lk/schools">
                <IconButton icon="back" />
            </Link>
            <Spacer top={1} />
            <h2>Редактирование адреса</h2>
            <Card>
                <Input
                    name="school_name"
                    label="Номер ОУ"
                    onChange={handle_change}
                    value={school_data.number}
                />

                <Spacer top={1} />
                <Input
                    name="city"
                    label="Город"
                    onChange={handle_change}
                    value={school_data.city}
                />

                <Spacer top={1} />
                <Input
                    name="subway"
                    label="Метро"
                    onChange={handle_change}
                    value={school_data.subway}
                />

                <Spacer top={1} />
                <Input
                    name="address"
                    label="Адрес"
                    onChange={handle_change}
                    value={school_data.address}
                />

                <Spacer top={1} />
                <Input
                    name="contact_person"
                    label="Контактное лицо"
                    onChange={handle_change}
                    value={school_data.contact}
                />

                <Spacer top={1} />
                <Input
                    name="contact_number"
                    label="Номер телефона"
                    onChange={handle_change}
                    value={school_data.phone}
                />
                <Spacer top={3} />
                <Button expand>Сохранить</Button>
            </Card>
            <Spacer top={4} />
            <h2>Управление адресом</h2>
            <Card>
                <Button expand secondary>
                    Что то еще
                </Button>
                <Spacer top={2} />
                <Button expand red>
                    Удалить
                </Button>
            </Card>
        </Container>
    );
}
