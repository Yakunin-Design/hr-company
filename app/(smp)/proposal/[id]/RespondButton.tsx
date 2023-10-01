"use client";
import axios from "axios";
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

type props = {};

export default function RespondButton(props: props) {
    function proposalAction(action: "accept" | "decline") {
        const proposal_id = "";
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/proposal/${proposal_id}/${action}`,
                {},
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                if (res.status === 200) {
                    window.location.replace("/");
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

    console.log(window.location.origin);

    return (
        <Row gap={1}>
            <Button onClick={acceptProposal}>Да</Button>
            <Button onClick={declineProposal} red>
                Нет
            </Button>
        </Row>
    );
}
