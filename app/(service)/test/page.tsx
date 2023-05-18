import WorkerCard from "@/components/WorkerCard";

export default function TestPage() {
	
	const worker_data = {
		id: "123",
		name: "Савилов Андрей",
		specialty: "Повар",
		is_ready: true
	}

    return (
		<>
			<h1>Welcome to the test page</h1>
			<WorkerCard worker_data={worker_data}/>
		</>
	)
}
