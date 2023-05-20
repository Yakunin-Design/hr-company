import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import JoTitle from "./JoTittle";
import JoMainInfo from "./JoMainInfo";
import style from "./jo.module.css"

import get_data from "./get_data";

type params = {
    id: string;
}

export default async function Page({params}: {params: params}) {
	const worker = await get_data(params.id);
	console.log(worker);

    //@ts-ignore
    const avatar = worker.logo || "empty";

    return (
		<Container wrapper>
			<Overlay href="/test" avatar={avatar}>
				<h2 className="--cd">{worker.full_name}</h2>
				<Spacer top="3"/>
				<hr />
				<Spacer top="3"/>
			</Overlay>
		</Container>
    )
}
