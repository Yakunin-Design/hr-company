"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/std/Button";

type props = {
    ticket_id: string;
    school_id: string;
    position: string;
};

export default function RespondButton(props: props) {
    const [respond, set_respond] = useState<
        "accepted_worker" | "worker" | "candidate" | "hidden"
    >("hidden");

    let job_offer_id = "";
    if (typeof window !== "undefined") {
        job_offer_id = window.location.pathname.split("/")[2];
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/smp-respond-status`,
                {
                    ticket_id: props.ticket_id,
                    school_id: props.school_id,
                    position: props.position,
                    worker: jwt,
                },
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                if (res.status === 200) {
                    set_respond(res.data.status);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    function onClick() {
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/smp-respond`,
                {
                    ticket_id: props.ticket_id,
                    school_id: props.school_id,
                    position: props.position,
                    worker: jwt,
                    job_offer_id,
                },
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            {respond === "worker" && (
                <Button onClick={onClick} expand>
                    Откликнуться
                </Button>
            )}
            {respond === "candidate" && (
                <div className="--cd">
                    <b>Вы откликнулись на эту вакансию 👌</b>
                </div>
            )}
            {respond === "accepted_worker" && (
                <div className="--cd">
                    <b>Вы уже работаете по этой заявке 🔥</b>
                </div>
            )}
        </>
    );
}
