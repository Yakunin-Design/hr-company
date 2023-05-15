import Row from "@/components/std/Row"
import style from "./point.module.css"
import Subway from "@/components/Subway"
import Spacer from "@/components/std/Spacer"
import CloseIcon from "@/components/CloseIcon"
import Link from "next/link"

type props = {
    data: PointData
}

type PointData = {
    _id: string,
    address: string,
    emp_id: string,
    job_offers: Array<string>,
    subway: string,
    workers: Array<string>,
}

export default function Point(props: props) {
    return (
        <>
            <Spacer top="2"/>
            <Link href={"/lk/points/"+props.data._id}>
                <Row className={style.point}>
                    <Row className={style.main}>
                        <div className={style.location}>
                            <h3 className={style.address}>{props.data.address}</h3>
                            <Subway station={props.data.subway}/>
                        </div>
                        <Row className={style.point_stats}>
                            <p className="--v2">Вакансий: {props.data.job_offers.length}</p>
                            <p className="--v2">Сотрудников: {props.data.workers.length}</p>
                        </Row>
                    </Row>
                </Row>
            </Link>
        </>
        
    )
}