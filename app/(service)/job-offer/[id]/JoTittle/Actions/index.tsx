import Button from "@/components/std/Button"
import Row from "@/components/std/Row"
import style from "../jotitle.module.css"
import Spacer from "@/components/std/Spacer"
import jo_actions from "./jo_actions"
import Link from "next/link"

export default function Actions({user_type, jo_data}: {user_type: string, jo_data: any}) {

    const {activate_job_offer, close_job_offer} = jo_actions({id: jo_data._id});

    if (user_type === "owner") {
        if (jo_data.status === "active") {
            return (
                <>
                    <Spacer top="1.5"/>
                    <Row className={style.actions}>
                        <Link href={"/lk/job-offers/edit/" + jo_data._id}>
                            <Button className={style.action}>Редактировать</Button>
                        </Link>
                        <Button className={style.action} secondary onClick={close_job_offer}>Закрыть</Button>
                    </Row>
                </>
            )
        } else {
            return(
            <>
                <Spacer top="1.5"/>
                <Row className={style.actions}>
                    <Button className={style.action} onClick={activate_job_offer}>Активировать</Button>
                </Row>
            </>)
        }
    }
    return (
        <>
        </>
    )
}