"use client";

import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import job_offer_controller from "./job_offer_controller";
import Spacer from "@/components/std/Spacer";
import JoTitle from "./JoTittle";
import JoMainInfo from "./JoMainInfo";

type params = {
    id: string;
}

export default function Page({params}: {params: params}) {

    const {jo_data, candidates, workers, user_type} = job_offer_controller(params.id)

    //@ts-ignore
    const avatar = jo_data ? (jo_data.avatar != "" ? jo_data.avatar : "empty") : "empty";
    const href = (user_type == "owner" || user_type == "employer") ? "/lk/job-offers" : "/search";
    
    return (
    <Container wrapper>
        <Overlay href={href} avatar={avatar}>
            <JoTitle jo_data={jo_data} user_type={user_type}/>
            <Spacer top="3"/>
            <hr />
            <JoMainInfo jo_data={jo_data}/>
        </Overlay>
    </Container>
    )
}