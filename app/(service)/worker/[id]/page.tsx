"use client";
import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Row from "@/components/std/Row";
import JoTitle from "./JoTittle";
import JoMainInfo from "./JoMainInfo";
import style from "./jo.module.css"

type params = {
    id: string;
}

export default function Page({params}: {params: params}) {
    //@ts-ignore
    const avatar = "empty";
    const href = "/test";

    return (
		<Container wrapper>
			<Overlay href={href} avatar={avatar}>
				<h2>Worker</h2>
				<Spacer top="3"/>
				<hr />
				<Spacer top="3"/>
			</Overlay>
		</Container>
    )
}
