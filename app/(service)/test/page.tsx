import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";

import AddressPlate from "@/components/smp/AddressPlate";
import PositionsIndicator from "@/components/smp/PositionsIndicator";
import SchoolManagerPlate from "@/components/smp/SchoolManagerPlate";

export default function TestPage() {
    return (
		<Container wrapper>
			<Spacer top="2"/>
			<h2>Welcome to the test page</h2>
			<p>for test purposes</p>
			<Spacer top={2}/>

			<AddressPlate 
				school="Школа 486" 
				address="Дворцовая площадь д1"
				positions={5}
				available={2}
			/>

			<SchoolManagerPlate
				full_name="Смирнов Василий Александрович"
				phone="+79876543221"
			/>	

		</Container>
	)
}
