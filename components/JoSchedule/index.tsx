import Spacer from "@/components/std/Spacer";
import Image from "next/image";
import question from "./question.svg"
import Row from "@/components/std/Row";
import style from "./joschedule.module.css"
import ScheduleBlocks from "./ScheduleBlocks";
import time_span from "@/assets/svg/time_span.svg"

export default function JoSchedule({schedule, working_time}: {schedule: any, working_time: any}) {

    let schedule_block
    if(!schedule || schedule.weekends == "" || schedule.weekdays == "") {
        schedule_block = <p className="--v2">График работы договорной</p>
    } else {
        schedule_block = (
        <>   
            <Row title={schedule.weekdays + " через " + schedule.weekends} className={style.row}>
                <h4>График работы</h4>
                <Image src={question} alt="question" height={15}/>
            </Row>
            <Spacer top=".5"/>
            <Row className={style.schedule_graph}>
                <ScheduleBlocks schedule={schedule}/>
            </Row>
        </>)
    }

    let working_time_block = <></>
    if(working_time && working_time.start != "" && working_time.end != "") {
        working_time_block = (
            <>
                <Spacer top="1.5"/>
                <Row>

                    <div>
                        <p className={style.time_title}>Начало</p>
                        <h3 className={style.time_value}>{working_time.start}</h3>
                    </div>

                    <Image src={time_span} alt="time_span"/>

                    <div>
                        <p className={style.time_title}>Окончание</p>
                        <h3 className={style.time_value}>{working_time.end}</h3>
                    </div>

                </Row>
            </>
        )
    }

    return(
    <>
        <Spacer top="1.5"/>
        {schedule_block}
        {working_time_block}
    </>
   )
}