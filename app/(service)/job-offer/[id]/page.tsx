"use client";

import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import job_offer_controller from "./job_offer_controller";
import Spacer from "@/components/std/Spacer";
import JoTitle from "./JoTittle";
import JoMainInfo from "./JoMainInfo";
import style from "./jo.module.css"
import Row from "@/components/std/Row";

type params = {
    id: string;
}

export default function Page({params}: {params: params}) {

    const {jo_data, candidates, workers, user_type} = job_offer_controller(params.id)

    //@ts-ignore
    const avatar = jo_data ? (jo_data.avatar != "" ? jo_data.avatar : "empty") : "empty";
    const href = (user_type == "owner" || user_type == "employer") ? "/lk/job-offers" : "/find-job";
    
    const candidate_blocks = candidates.map((candidate) => {
        //@ts-ignore
        return <h3>{candidate.full_name}</h3>
    })

    return (
    <Container wrapper>
        <Overlay href={href} avatar={avatar}>
            <JoTitle jo_data={jo_data} user_type={user_type}/>
            <Spacer top="3"/>
            <hr />
            <JoMainInfo jo_data={jo_data}/>
            {
                user_type == "owner" &&
                <>
                    <hr />
                    <Spacer top="2"/>
                    <div className={style.candidates}>
                    {
                        (candidates.length > 0) ?
                        <>
                            <h2>Кандидаты</h2>
                            <Spacer top="2"/>
                            <Row className={style.candidates_row}>
                                {candidate_blocks}
                            </Row>
                        </>
                        :
                        <>
                            <h2>Кандидаты отсутствуют</h2>
                        </>
                    }
                    </div>
                </>
            }
            <Spacer top="3"/>
        </Overlay>
    </Container>
    )
}