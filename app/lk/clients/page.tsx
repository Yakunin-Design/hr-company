import Button from "@/components/std/Button";
import Container from "@/components/std/Container";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Link from "next/link";
import ClientsPlate from "./ClientsPlate";
import get_data from "./get_data";

export default async function ClientsPage() {
    const clients_data = await get_data();

    const client_list = clients_data.map((client: any) => (
        <>
            <ClientsPlate id={client._id} name={client.name} />
            <Spacer top={1} />
        </>
    ));
    return (
        <Container wrapper lk>
            <Spacer top={2} />
            <Row>
                <h2>Клиенты</h2>
                <Link href={`/lk/clients/new`}>
                    <Button secondary>Добавить клиента +</Button>
                </Link>
            </Row>
            {client_list}
        </Container>
    );
}
