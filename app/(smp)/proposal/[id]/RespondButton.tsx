"use client";
import axios from "axios";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

type props = {};

export default function RespondButton(props: props) {
    function proposalAction(action: "accept" | "decline") {
        const req_string = `${process.env.API_ADDRESS}${window.location.pathname}/${action}`;

        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(req_string, {}, config)
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                if (res.status === 200) {
                    console.log(res.data);
                    window.location.replace(
                        `/job-offers/${res.data.job_offer_id}`
                    );
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    function acceptProposal() {
        proposalAction("accept");
    }

    function declineProposal() {
        proposalAction("decline");
    }

    return (
        <Row gap={1}>
            <Button onClick={acceptProposal}>Да</Button>
            <Button onClick={declineProposal} red>
                Нет
            </Button>
        </Row>
    );
}
