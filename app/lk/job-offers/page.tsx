"use client"
import Container from "@/components/std/Container";
import { CheckUser } from "../checkUser";
import user_controller from "../user_controller";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import style from "./joboffers.module.css"
import Spacer from "@/components/std/Spacer";
import job_offer_controller from "./job_offer_controller";
import JobOfferRow from "./JobOfferRow";
import Link from "next/link";

type jo = {
    address: string
    candidate_count: number
    created: number
    employer_id: string
    id: string
    salary: { 
        amount: string, 
        period: string 
    }
    specialty: string
    status: string
    subway: string
}

export default function Page() {
    const {
        user,
        set_user,
    } = user_controller();

    CheckUser(user, set_user);
    const router = useRouter()
    useEffect(() => {
        user.user_type === "worker" && router.push("/lk/profile")
    },[])

    const {min_job_offers} = job_offer_controller()


    const active_job_offers: Array<JSX.Element> = []
    const closed_job_offers: Array<JSX.Element> = []

    if (min_job_offers) {
        min_job_offers.forEach((jo: jo) => {
            if (jo.status === 'active') { 
                active_job_offers.push(<JobOfferRow key={jo.id} data={jo}/>)
            } else {
                closed_job_offers.push(<JobOfferRow key={jo.id} data={jo}/>)
            }
        })
    }
    
    return (
        <Container lk wrapper>
            <Spacer top="2"/>
            <Row className={style.head} gap={2}>
                <h2>Активные вакансии</h2>
                <Link href="/lk/job-offers/create"className={style.create_btn}>
                    <Button expand>Создать вакансию</Button>
                </Link>
            </Row>
            <Spacer top="2"/>
            { active_job_offers.length > 0 ? active_job_offers : <p>У вас нет активных вакансий</p>}

            { closed_job_offers.length != 0 && 
            <>
                <Spacer top="3"/>
                <h2 className="--mt3">Закрытые вакансии</h2>
                { closed_job_offers }
            </>
            }
            
        </Container>
    );
}
