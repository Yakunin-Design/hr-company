import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import Card from "@/components/Card";

import PositionsIndicator from "@/components/smp/PositionsIndicator";
import AddressPlate from "@/components/smp/AddressPlate";
import SchoolManagerPlate from "@/components/smp/SchoolManagerPlate";
import ProgressBar from "@/components/smp/ProgressBar";
import TicketInfo from "@/components/smp/TicketInfo";

export default function TestPage() {
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
			<Spacer top="2"/>
			<h2>Welcome to the test page</h2>
			<p>for test purposes</p>
			<Spacer top={2}/>

			<Row>
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
			</Card>

			<Spacer top={2} />
			
		</Container>
		</>
	)
}
