import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import Card from "@/components/Card";

import PositionsIndicator from "@/components/smp/PositionsIndicator";
import AddressPlate from "@/components/smp/AddressPlate";
import SchoolManagerPlate from "@/components/smp/SchoolManagerPlate";
import ProgressBar from "@/components/smp/ProgressBar";
import TicketInfo from "@/components/smp/TicketInfo";
import SmpJoCard from "@/components/smp/SmpJoCard";
import PositionList from "@/components/smp/PositionsList";
import TicketPlate from "@/components/smp/TicketPlate";

export default function TestPage() {
    const dummy_ticket_plate = {
        _id: "64973f3726c4e94a67cdc934",
        total_workers_count: 7,
        accepted: 5,
        status: "Pending",
        realization_date: "25.06.2023"
    }

    return (
        <>
            <Container wrapper>
                <Spacer top="2" />
                <h2>Welcome to the test page</h2>
                <p>for test purposes</p>
                <Spacer top={2} />
            </Container>
        </>
    );
}
