"use client";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import { useState, useEffect } from "react";

type props = {
    ticket_id: string;
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
    }

    async function extend_ticket() {
        const result = await axios.get(
            `${process.env.API_ADDRESS}/extend-ticket/${props.ticket_id}`,
            config
        );
    }

    return (
        <>
            <Spacer top={2} />
            <Button secondary expand red onClick={close_ticket}>
                Закрыть
            </Button>
            <Spacer top={2} />
            <Button secondary expand onClick={extend_ticket}>
                Продлить
            </Button>
        </>
    );
}
