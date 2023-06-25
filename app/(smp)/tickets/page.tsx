import TicketPlate from "@/components/smp/TicketPlate";
import axios from "axios";
import { cookies } from "next/headers";
import Spacer from "@/components/std/Spacer";
import Container from "@/components/std/Container";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Link from "next/link";
import styles from "./tickets.module.css";

type plate_ticket_data = {
    _id: string;
    accepted: number;
    total_workers_count: number;
    status: "active" | "inactive" | "pending";
    realization_date: string;
};

async function get_tickets() {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };
    const db_tickets = await axios.get(
        `${process.env.API_ADDRESS}/tickets`,
        config
    );
    return db_tickets.data;
}

export default async function TicketsPage() {
    const data = await get_tickets();
    const ticket_list = data.map((ticket: plate_ticket_data) => (
        <TicketPlate
            key={ticket._id}
            id={ticket._id}
            accepted={ticket.accepted}
            total_workers_count={ticket.total_workers_count}
            status={ticket.status === "pending" ? "active" : "inactive"}
            realization_date={ticket.realization_date}
        />
    ));

    return (
        <Container wrapper>
            <Spacer top="2" />
            <Row className={styles.head}>
                <h1>Ваши заявки</h1>
                <Link href={"/new-ticket"}>
                    <Button secondary expand>Добавить заявку &#65291;</Button>
                </Link>
            </Row>
            <Spacer top="2" />
            {ticket_list}
        </Container>
    );
}
