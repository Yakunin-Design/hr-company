import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import style from "./joinfo.module.css"
import description_display from "./description_display"
import Card from "@/components/Card";
import JoAddress from "./JoAddress";
import JoSchedule from "./JoSchedule";
import JoAdvanced from "./JoAdvanced";

export default function JoMainInfo({jo_data}: {jo_data: any}) {

    const description = description_display(jo_data.description)
    const period = jo_data.salary.period == "hour" ? "час" : jo_data.salary.period == "month" ? "месяц" : "смена"

    return (
    <>
        <Spacer top="4"/>
        <Row className={style.container}>
            <Card className={style.main_info}>
                <div className={style.card_container}>
                    <JoAddress jo_data={jo_data}/>
                    <JoSchedule jo_data={jo_data}/>
                    <JoAdvanced jo_data={jo_data}/>
                </div>
                <Spacer top="2"/>
                <div className={style.price}>
                    <h4 className={style.price_text}>{jo_data.salary.amount + "₽ - " + period}</h4>
                </div>
            </Card>
            
            
            <div className={style.description}>
                {description ? (
                    <p>{description}</p>
                ) : (
                    <h3>Описание отсутствует</h3>
                )}
            </div>
            
        </Row>
        <Spacer top="4"/>
    </>
    )
}
