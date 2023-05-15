import Spacer from "@/components/std/Spacer";
import Image from "next/image";
import question from "./question.svg"
import Row from "@/components/std/Row";
import style from "./joschedule.module.css"
import ScheduleBlocks from "./ScheduleBlocks";
import time_span from "@/assets/svg/time_span.svg"

export default function JoSchedule({jo_data}: {jo_data: any}) {

    let schedule
    if(!jo_data.schedule || jo_data.schedule.weekends == "" || jo_data.schedule.weekdays == "") {
        schedule = <p className="--v2">График работы договорной</p>
    } else {
        schedule = (
        <>   
            <Row title={jo_data.schedule.weekdays + " через " + jo_data.schedule.weekends} className={style.row}>
                <h4>График работы</h4>
                <Image src={question} alt="question" height={15}/>
            </Row>
            <Spacer top=".5"/>
            <Row className={style.schedule_graph}>
                <ScheduleBlocks jo_data={jo_data}/>
            </Row>
        </>)
    }

    let working_time = <></>
    if(jo_data.schedule && jo_data.schedule.weekends != "" && jo_data.schedule.weekdays != "") {
        working_time = (
            <>
                <Spacer top="1.5"/>
                <Row>

                    <div>
                        <p className={style.time_title}>Начало</p>
                        <h3 className={style.time_value}>{jo_data.working_time.start}</h3>
                    </div>

                    <Image src={time_span} alt="time_span"/>

                    <div>
                        <p className={style.time_title}>Окончание</p>
                        <h3 className={style.time_value}>{jo_data.working_time.end}</h3>
                    </div>

                </Row>
            </>
        )
    }
    return(
    <>
        <Spacer top="1.5"/>
        {schedule}
        {working_time}
    </>
   )
}