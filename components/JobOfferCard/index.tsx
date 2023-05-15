import Link from "next/link";
import Card from "../Card";
import style from "./jocard.module.css"
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Row from "../std/Row";
import Subway from "../Subway";

type jo_data = {
    _id: string
    point_id: string
    employer_id: string

    candidates: Array<string>
    candidate_count: number
    created: number

    specialty: string
    salary: { amount: string, period: string }
    
    citizenship: string
    description: string
    experience: string
    sex: string
    age: { from: string, to: string }


    status: string
    type: string

    schedule?: { weekends: string, weekdays: string }
    working_time?: { start: string, end: string }
    city?: string
}

interface response {
    logo: string,
    name: string,
    subway: string,
    city: string,
}

export default function JobOfferCard({jo_data, className}: {jo_data: jo_data, className: string}){

    const [point, set_point] = useState<response>({
        logo: "",
        name: "",
        subway: "",
        city: ""
    })
    
    useEffect(()=>{
        axios.get(`http://localhost:6969/job-offers/${jo_data._id}/get-point-data`)
        .then(res => set_point(res.data))
    },[])


    return (
        <Link href={"/job-offer/" + jo_data._id}>
            <Card className={style.card + " " + className}>
                <Row className={style.header}>
                    <Row className={style.label}>
                            {
                            point.logo != "" 
                            ? 
                                <Image src={point.logo} alt="logo" width={15} height={15} className={style.logo}/> 
                            : 
                                <div className={style.logo}></div>
                            }
                        <h4>{point.name}</h4>
                    </Row>
                    <Row className={style.address}>
                            <h4 className={style.city}>{point.city}</h4>
                            <Subway station={point.subway} text_style="h4"/>
                    </Row>
                </Row>
            </Card>
        </Link>
        
    )
}