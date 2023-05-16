import Spacer from "@/components/std/Spacer"
import style from "./pointform.module.css"
import Row from "@/components/std/Row"
import Button from "@/components/std/Button"
import DefaultSettings from "./DefaultSettings"
import MainSettings from "./MainSettings"
import AdvancedSettings from "./AdvancedSettings"

type form_data = {
    specialty: string,
    city: string,
    address: string,
    subway: string,
    salary: {
        amount: string,
        period: string
    },
    experience: string,
    schedule: {
        weekdays: string,
        weekends: string,
    },
    working_time: {
        start: string,
        end: string,
    },
    citizenship: string,
    sex: string,
    age: {
        from: string,
        to: string,
    },
    description: string
}

type point = {
    _id: string
    address: string
    emp_id: string
    job_offers: Array<Object | null>
    subway: string
    workers: Array<Object | null>
}

type props = {
    create: () => void,
    data: form_data,
    points: Array<point>,
    errors: Array<string>,
    onChange: (event: any) => void,
    type: "create" | "edit"
}

const error_style = {
    border: "2px solid red",
};

export default function PointForm(props: props) {

    return(
        <>
            <h2 className={style.header}>{props.type === "create" ? "Создание" : "Редактирование"} вакансии</h2>
            <Spacer top="1"/>
            <hr />
            <Spacer top="2"/>
            <div className={style.form}>
                <DefaultSettings data={props.data} onChange={props.onChange} errors={props.errors} points={props.points}/>
                <Spacer top="5" />
                <div className={style.block_desc}>
                    <h2>Основные</h2>
                    <p>Рекомендуем заполнить эти поля для повышения релевантности вакансии</p>
                </div>
                <Spacer top="2"/>
            </div>

            <hr />
            <Spacer bottom="6"/>

            <div className={style.form}>
                <MainSettings data={props.data} onChange={props.onChange} errors={props.errors}/>
                <Spacer top="6" />
                <div className={style.block_desc}>
                    <h2>Дополнительные</h2>
                    <p>Заполнив эти настройки вы поможете правильным соискателям найти вашу вакансию</p>
                </div>
                <Spacer top="2"/>
            </div>
            <hr />
            <Spacer bottom="2"/>


            <div className={style.form}>
                <AdvancedSettings data={props.data} onChange={props.onChange} errors={props.errors}/>
                <Spacer top="2"/>
                <Row className={style.buttons}>
                    <Button className={style.button} onClick={props.create} secondary>Предпросмотр</Button>
                    <Button className={style.button} onClick={props.create}>Сохранить</Button>
                </Row>
                
            </div>
        </>
    )
}