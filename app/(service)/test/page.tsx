import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";

import AddressPlate from "@/components/smp/AddressPlate";
import PositionsIndicator from "@/components/smp/PositionsIndicator";

export default function TestPage() {
    return (
		<Container wrapper>
			<Spacer top="2"/>
			<h2>Welcome to the test page</h2>
			<p>for test purposes</p>
			<AddressPlate 
				school="Школа 486" 
				address="Дворцовая"
				positions={5}
				available={5}
				subway="Адмиралтейская"
			/>
		</Container>
	)
}
