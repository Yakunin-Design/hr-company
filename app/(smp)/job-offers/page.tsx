"use client";
import Container from "@/components/std/Container";
import Search from "./Search";
import Spacer from "@/components/std/Spacer";
import axios from "axios";
import style from "./jobOffers.module.css";
import { useEffect, useState } from "react";
import SmpJoCard from "@/components/smp/SmpJoCard";

export default function JobOffers() {
    const [job_offers, set_job_offers] = useState([]);
    const [showed_job_offers, set_showed_job_offers] = useState([]);

    const [query, set_query] = useState({
        string: "",
        filters: {},
    });

    useEffect(() => {
        axios.get(`${process.env.API_ADDRESS}/smp-job-offers`).then(res => {
            set_job_offers(res.data);
            set_showed_job_offers(res.data);
        });
    }, []);

    function handle_change(event: any) {
        const { name, value } = event.target;

        if (name === "query") {
            set_query(prev => {
                return {
                    ...prev,
                    string: value,
                };
            });
        } else {
            set_query(prev => {
                return {
                    ...prev,
                    filters: {
                        [name]: value,
                    },
                };
            });
        }
    }

    function search() {
        if (query.string === "") {
            set_showed_job_offers(job_offers);
        } else {
            set_showed_job_offers(prev => {
                return job_offers.filter((job: any) => {
                    if (job.position !== query.string) return false;
                    return true;
                });
            });
        }
    }

    const job_offers_list = showed_job_offers.map((jo: any) => {
        const jo_data = {
            id: jo._id,
            specialty: jo.position,
            positions: jo.quontity,
            subway: jo.subway,
            address: jo.address,
            working_time: {
                start: jo.working_hours.from,
                end: jo.working_hours.to,
            },
            salary: {
                amount: jo.price,
                period: "day",
            },
        };

        return <SmpJoCard jo_data={jo_data} />;
    });

    return (
        <Container wrapper>
            <Spacer top={3} bottom={1}>
                <h2>Найти работу</h2>
            </Spacer>
            <Search
                query={query}
                handle_change={handle_change}
                search={search}
            />

            <div className={style.jobs_grid}>{job_offers_list}</div>
        </Container>
    );
}
