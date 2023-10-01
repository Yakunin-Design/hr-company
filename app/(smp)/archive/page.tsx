import TicketPlate from "@/components/smp/TicketPlate";
import axios from "axios";
import { cookies } from "next/headers";
import Spacer from "@/components/std/Spacer";
import Container from "@/components/std/Container";
import { ticket_status, convert_status } from "@/types/ticket_status";
import Link from "next/link";

type plate_ticket_data = {
    _id: string;
    accepted: number;
    total_workers_count: number;
    status: ticket_status;
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
        `${process.env.API_ADDRESS}/archive`,
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
            status={ticket.status}
            realization_date={ticket.realization_date}
        />
    ));

    return (
        <Container wrapper>
            <Spacer top="2" />
            <h2>Архив заявок</h2>
            <Link href={"/tickets"}> ⮌ Текущие заявки</Link>
            <Spacer top="2" />
            {ticket_list}
        </Container>
    );
}
