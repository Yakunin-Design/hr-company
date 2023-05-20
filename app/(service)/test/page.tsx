import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import WorkerCard from "@/components/WorkerCard";

export default function TestPage() {
	
	const worker_data = {
		_id: "64620d718869ec1e6d04d1cb",
		full_name: "Савилов Андрей",
		specialty: "Повар",
		is_ready: true,
		logo: "none"
	}

    return (
		<Container wrapper>
			<Spacer top="2"/>
			<h2>Welcome to the test page</h2>
			<WorkerCard worker_data={worker_data}/>
		</Container>
	)
}
