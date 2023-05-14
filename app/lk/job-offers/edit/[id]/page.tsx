"use client"

import { CheckUser } from "../../../checkUser";
import user_controller from "../../../user_controller";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import Container from "@/components/std/Container";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import Overlay from "@/components/Overlay";

import style from "../../joboffers.module.css"

import job_offer_controller from "../../job_offer_controller";
import JobOfferRow from "../../JobOfferRow";


import JobOfferForm from "./JobOfferForm";

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

type params = {
    id: string,
}

export default function Page({params}: {params: params}) {
    const {
        user,
        set_user,
    } = user_controller();

    CheckUser(set_user);
    const router = useRouter()
    useEffect(() => {
        user.user_type === "worker" && router.push("/lk/profile")
    },[])

    const {min_job_offers, form_data, points, errors, handle_change, update_jo} = job_offer_controller(params.id)


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
        <>
            <Overlay href="/lk/job-offers">
                <JobOfferForm data={form_data} errors={errors} onChange={handle_change} points={points} create={update_jo}></JobOfferForm>
            </Overlay>
            <Container lk wrapper>
                <Spacer top="2"/>
                <Row className={style.head}>
                    <h2>Активные вакансии</h2>
                    <Link href="/lk/job-offers/create">
                        <Button className={style.create_btn}>Создать вакансию</Button>
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
        </>
    );
}
