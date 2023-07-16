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
import EmptyPosition from "./EmptyPosition";
import TakenPosition from "./TakenPosition";
import { usePathname } from "next/navigation";

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

    let total_positions = 0;
    let total_accepted = 0;
    address_data.positions.forEach((pos: any) => {
        total_positions += Number(pos.quontity);
        total_accepted += pos.accepted.length;
    });

    let empty_positions: JSX.Element[] = [];
    let accepted_positions: JSX.Element[] = [];

    let position_index = 0;

    address_data.positions.forEach((position: any) => {
        position.accepted.forEach((accepted: any) => {
            accepted_positions.push(
                <TakenPosition
                    key={accepted.id}
                    id={accepted.id}
                    position={position.position}
                    full_name={accepted.full_name}
                    avatar={accepted.avatar}
                    link={position_index}
                />
            );
        });

        for (let i = 0; i < position.quontity - position.accepted.length; i++) {
            empty_positions.push(
                <EmptyPosition
                    key={position}
                    position={position.position}
                    link={position_index}
                    working_time={position.working_hours}
                    candidates={position.candidates.length}
                />
            );
        }

        position_index++;
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
                    {address_data.contact && (
                        <SchoolManagerPlate
                            full_name={address_data.contact}
                            phone={address_data.phone}
                        />
                    )}

                    <Spacer top={2} />
                    <Row>
                        <h2>Позиции</h2>
                        <PositionsIndicator
                            positions={total_positions}
                            available={total_accepted}
                            light
                        />
                    </Row>

                    <Spacer top={1} />
                    {/* <PositionList positions={address_data.positions} add_position={false} /> */}

                    {accepted_positions}
                    {empty_positions}

                    <Spacer top={20} />
                </Container>
            </Padding>
            <Spacer top={-5} />
        </>
    );
}
