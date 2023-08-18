"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import { useState, useEffect } from "react";
import JobOfferCard from "@/components/JobOfferCard";
import { jo_data } from "@/components/JobOfferCard";
import Row from "@/components/std/Row";
import style from "./myjob.module.css";

type my_jobs = {
    my_job: jo_data[];
    responds: jo_data[];
};

export default function MyJobPage() {
    const [my_jobs, set_my_jobs] = useState<my_jobs>({
        my_job: [],
        responds: [],
    });

    useEffect(() => {
        const url = `${process.env.API_ADDRESS}/my-job`;

        const jwt = localStorage.getItem("jwt") || "";
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios.get(url, config).then(res => {
            set_my_jobs(res.data);
        });
    }, []);

    const responds_to_job_offers =
        my_jobs.responds.length > 0 ? (
            my_jobs.responds.map(respond => {
                return (
                    <JobOfferCard
                        jo_data={respond}
                        key={respond._id}
                        className={style.respond}
                    />
                );
            })
        ) : (
            <p>Тут будут отображаться вакансии, на которые вы откликнулись</p>
        );

    return (
        <Container lk wrapper>
            {/* <Spacer top="2" />
            <h2>Моя работа</h2>
            <Spacer top="1" />
            <p>Вы еще не устроились на работу</p> */}
            <Spacer top="2" />
            <h2>Отклики</h2>
            <Spacer top="1" />
            <Row className={style.responds}>{responds_to_job_offers}</Row>
        </Container>
    );
}
