import Row from "@/components/std/Row"
import style from "./point.module.css"
import Subway from "@/components/Subway"

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
    console.log(props);

    return (
        <Row className={style.point}>
            <div className={style.location}>
                <h3>{props.data.address}</h3>
                <Subway station={props.data.subway}/>
            </div>
        </Row>
    )
}