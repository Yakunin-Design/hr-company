import axios from "axios";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import { cookies } from "next/headers";
import TicketInfo from "@/components/smp/TicketInfo";
import AddressPlate from "@/components/smp/AddressPlate";
import IconButton from "@/components/IconButton";
import Link from "next/link";

type params = {
    id: string,
    number: number,
};

async function get_address(id: string, number: number) {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };
    const db_tickets = await axios.get(
        `${process.env.API_ADDRESS}/address/${id}/${number}`,
        config
    );

    return db_tickets.data;
}

export default async function AddressPage({ params }: { params: params }) {
    const address_data = await get_address(params.id, params.number);

    return (
        <Container wrapper>
            <Link href={`/tickets/${params.id}`}>
                <IconButton icon="back"/>
            </Link>
            <h1>{address_data.number}</h1>
            <p>{address_data.address}</p>
        </Container>
    );
}
