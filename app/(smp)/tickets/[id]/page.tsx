import axios from "axios";
import Container from "@/components/std/Container";
import { cookies } from "next/headers";
import TicketInfo from "@/components/smp/TicketInfo";
import AddressPlate from "@/components/smp/AddressPlate";
import Link from "next/link";
import TicketActions from "./TicketActions";

type params = {
    id: string;
};

type address = {
    _id: string;
    number: string;
    address: string;
    worker_count: number;
    accepted: number;
    subway?: string;
};

async function get_ticket(id: string) {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };
    const db_tickets = await axios.get(
        `${process.env.API_ADDRESS}/tickets/${id}`,
        config
    );

    return db_tickets.data;
}

export default async function TicketPage({ params }: { params: params }) {
    const ticket_data = await get_ticket(params.id);

    let address_index = 0;
    const address_list = ticket_data.addresses.map((adr: address) => {
        address_index += 1;
        return (
            <Link href={`/tickets/${params.id}/${address_index - 1}`}>
                <AddressPlate
                    school={adr.number}
                    address={adr.address}
                    worker_count={adr.worker_count}
                    accepted={adr.accepted}
                />
            </Link>
        );
    });

    return (
        <>
            <TicketInfo
                id={params.id}
                accepted={ticket_data.accepted}
                total_workers_count={ticket_data.total_workers_count}
                status={ticket_data.status}
                realization_date={ticket_data.realization_date}
            />
            <Container wrapper>
                {address_list}

                <TicketActions ticket_id={params.id} />
            </Container>
        </>
    );
}
