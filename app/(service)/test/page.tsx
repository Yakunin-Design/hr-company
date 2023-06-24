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

export default function TestPage() {
    const jo_data = {
     id: "",
         specialty: "Повар универсал",
       positions: 2,
     subway: "Адмиралтейская",
     address: "Дворцовая площадь, дом 1",

     working_time: {
         start: "13:00",
         end: "21:00",
     },
     salary: {
         amount: 2800,
         period: "day",
     },
 };

    const candidates = [
        {
            id: "123",
            avatar: "",
            fullname: "Андрей Савилов",
        },
    ];

    const position_data = [
        {
            specialty: "Повар",
            count: 2,
            time: 7,
            candidates: candidates,
            accepted: ["123"],
        },
    ];

    return (
        <>
            <TicketInfo 
				title="Заявка №08052023-1"	
				progress={5}
				goal={7}
				status="active"
				created="8 Июня 2023, 12:45"
				description="this is very long desctiption text lmao"
			/>
            <Container wrapper>
                <Spacer top="2" />
                <h2>Welcome to the test page</h2>
                <p>for test purposes</p>
                <Spacer top={2} />

                {/* <Row>
				<PositionsIndicator
					positions={10}	
					light
				/>
				<PositionsIndicator
					positions={10}
					available={3}
				/>
			</Row>

			<AddressPlate 
				school="Школа 486" 
				address="Дворцовая площадь д1"
				positions={5}
				available={2}
			/>

			<SchoolManagerPlate
				full_name="Смирнов Василий Александрович"
				phone="+79876543221"
				position="Директор"
			/>	

			<Spacer top={1} />
			<ProgressBar
				progress={3}
				goal={7}
			/>
			
			<Spacer top={2} />
			<Card>
				<ProgressBar
					progress={3}
					goal={7}
					light
				/>
			</Card> */}
                <SmpJoCard jo_data={jo_data} />
                {/* <PositionList positions={position_data} /> */}

                <Spacer top={2} />
            </Container>
        </>
    );
}
