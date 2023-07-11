import axios from "axios";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import { cookies } from "next/headers";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import styles from "./AddressPage.module.css";
import Card from "@/components/Card";
import SchoolManagerPlate from "@/components/smp/SchoolManagerPlate";
import AddressCard from "@/components/AddressCard";
import Padding from "@/components/std/Padding";
import PositionsIndicator from "@/components/smp/PositionsIndicator";
import PositionList from "@/components/smp/PositionsList";

type params = {
    id: string;
    number: number;
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

    let positions = 0;
    let accepted = 0;
    address_data.positions.forEach((pos: any) => {
        positions += Number(pos.quontity);
        accepted += pos.accepted.length;
    });

    return (
        <>
            <div className={styles.overlay}></div>
            <Spacer top={2} />
            <Container>
                <Link href={`/tickets/${params.id}`} className={styles.link}>
                    <IconButton icon="back" />
                </Link>
            </Container>
            <Spacer top={2} />
            <Padding
                vertical={2}
                horisontal={0.5}
                className={styles.address_card}
            >
                <Container>
                    <h2>{address_data.number}</h2>
                    <Card>
                        <AddressCard
                            subway={address_data.subway}
                            address={address_data.address}
                        />
                    </Card>
                    <SchoolManagerPlate
                        full_name={address_data.contact}
                        phone={address_data.phone}
                    />
                    <Spacer top={2} />
                    <Row>
                        <h2>Позиции</h2>
                        <PositionsIndicator
                            positions={positions}
                            available={accepted}
                            light
                        />
                    </Row>

                    <Spacer top={1} />
                    <PositionList positions={address_data.positions} add_position={false} />

                    <Spacer top={20} />
                </Container>
            </Padding>
            <Spacer top={-5} />
        </>
    );
}
