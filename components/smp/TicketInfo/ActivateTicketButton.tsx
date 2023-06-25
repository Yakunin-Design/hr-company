"use client";

import Button from "@/components/std/Button";
import axios from "axios";
import { getCookie } from "cookies-next";

type props = {
    ticket_id: string
}

export default function ActivateTicketButton(props: props) {
    function onClick() {
        const accept = confirm("Вы уверены, что хотите активировать заяку?");
        if (accept) {
            const jwt = getCookie("jwt");
            const config = {
                headers: {
                    authorization: "Bearer " + jwt,
                },
            };
            axios.get(`${process.env.API_ADDRESS}/activate-ticket/${props.ticket_id}`, config).then(res => {
                window.location.reload();
            })
        }
    }

    return <Button secondary onClick={onClick}>Активировать заявку</Button>;
}
