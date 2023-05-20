"use client";

import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import job_offer_controller from "./job_offer_controller";
import Spacer from "@/components/std/Spacer";
import JoTitle from "./JoTittle";
import JoMainInfo from "./JoMainInfo";
import style from "./jo.module.css"
import Row from "@/components/std/Row";
import WorkerCard from "@/components/WorkerCard";

type params = {
    id: string;
}

export default function Page({params}: {params: params}) {

    const {jo_data, candidates, workers, user_type} = job_offer_controller(params.id)

    //@ts-ignore
    const avatar = jo_data ? (jo_data.avatar != "" ? jo_data.avatar : "empty") : "empty";
    const href = (user_type == "owner" || user_type == "employer") ? "/lk/job-offers" : "/find-job";
    
    console.log(candidates)
    const candidate_blocks = candidates.length > 0 ? 
    candidates.map((candidate) => {
        //@ts-ignore
        return <WorkerCard worker_data={candidate}/>
    })
    :
    <></>

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
                            <p>{candidates.length} {(candidates.length > 1 && candidates.length < 5) ? "человека" : "человек"}</p>
                            <Spacer top="2"/>
                            <div className={style.candidates_row}>
                                {candidate_blocks}
                            </div>
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