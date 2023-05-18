import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import WorkerCard from "@/components/WorkerCard";

export default function TestPage() {
	
	const worker_data = {
		id: "123",
		name: "Савилов Андрей",
		specialty: "Повар",
		is_ready: true
	}

    return (
		<Container wrapper>
			<Spacer top="2"/>
			<h2>Welcome to the test page</h2>
			<WorkerCard worker_data={worker_data}/>
		</Container>
	)
}
