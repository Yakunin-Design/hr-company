"use client";
import Card from "@/components/Card";
import ActivateTicketButton from "@/components/smp/TicketInfo/ActivateTicketButton";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

type props = {
    ticket_id: string;
    status: string;
};

export default function TicketActions(props: props) {
    const [jwt, set_jwt] = useState("");

    useEffect(() => {
        const local_jwt = localStorage.getItem("jwt");
        local_jwt && set_jwt(local_jwt);
    }, []);

    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    async function close_ticket() {
        const result = await axios.get(
            `${process.env.API_ADDRESS}/close-ticket/${props.ticket_id}`,
            config
        );

        window.location.replace("/archive");
    }

    async function extend_ticket() {
        const result = await axios.get(
            `${process.env.API_ADDRESS}/extend-ticket/${props.ticket_id}`,
            config
        );

        window.location.replace("/tickets");
    }

    return (
        <>
            <Card>
                <h3>Управление заявкой</h3>
                <Spacer top={2} />
                {props.status === "pending" && (
                    <>
                        <Link href={`/tickets/${props.ticket_id}/edit`}>
                            <Button secondary expand>
                                Редактировать
                            </Button>
                        </Link>
                        <Spacer top={2} />
                        <ActivateTicketButton ticket_id={props.ticket_id} />
                    </>
                )}

                {props.status === "in progress" && (
                    <>
                        <Button secondary expand red onClick={close_ticket}>
                            Закрыть
                        </Button>
                        <Spacer top={2} />
                        <Button secondary expand onClick={extend_ticket}>
                            Продлить
                        </Button>
                    </>
                )}

                {props.status != "in progress" && props.status != "pending" && (
                    <p>Действия над архивированной заявкой не доступны.</p>
                )}
            </Card>
        </>
    );
}
