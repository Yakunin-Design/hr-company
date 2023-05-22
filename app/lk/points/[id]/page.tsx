"use client"
import style from "./point.module.css"
import back_arrow_icon from "./back-arrow.svg"

import Container from "@/components/std/Container";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import Subway from "@/components/Subway";

import user_controller from "../../user_controller";
import { CheckUser } from "../../checkUser";
import point_controller from "../point_controller";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import JobOfferCard from "@/components/JobOfferCard";

type params = {
    id: string,
}

export default function Page({params}: {params: params}) {
    const {
        user,
        set_user,
    } = user_controller();

    CheckUser(user, set_user);

    const { point, get_point, delete_point } = point_controller();

    useEffect(() => {
        get_point(params.id);
    },[])

    const job_offers = (point && point.job_offers) ? 

    point.job_offers.map(jo => <JobOfferCard jo_data={jo} className={style.jo} key={jo._id}/>) : 
    <></>

    return (
        <Container lk wrapper>
            <Spacer top="2" />
            <Row className={style.head}>
                <Row className={style.info}>
                    <Row className={style.name}>
                        {user.user_type === 'employer' &&
                            <Link
                                className={style.floating_btn}
                                href="/lk/points"
                            >
                                <Image height="1.1" src={back_arrow_icon} className={style.floating_btn_img} alt="back-btn" />
                            </Link>
                        }
                        
                        <h2 className={style.label}>{point?.address}</h2>
                    </Row>
                    
                    <div className={style.subway}>
                        <Subway station={point?.subway}/>
                    </div>
                </Row>
                <Link href="/lk/job-offers/create" className={style.add_button}>
                    <Button  expand>Добавить вакансию</Button>
                    {
                        point && !point.job_offers && point.workers.length == 0
                        &&
                        <>
                            <Spacer top=".5"/>
                            <Button onClick={()=>{delete_point(point._id)}} red expand>Удалить точку</Button>
                        </>
                        
                    }
                </Link>
                
            </Row>
            <Spacer top="2"/>
            <div className={style.section}>
                <h2>Вакансии</h2>
                <Spacer top="1"/>
                <Row className={style.job_offers}>
                    {job_offers}
                </Row>
            </div>
        </Container>
    );
}
