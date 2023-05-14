import Input from "@/components/std/Inputs/Input"
import Row from "@/components/std/Row"
import Spacer from "@/components/std/Spacer"

import style from "./defaultS.module.css"
import SubwayInput from "@/components/std/Inputs/SubwayInput"
import SalaryRangeInput from "@/components/SalaryRangeInput"

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
    data: form_data,
    points: Array<point>
    errors: Array<string>
    onChange: (event: any) => void
}

const error_style = {
    border: "2px solid red",
};

export default function defaultSettings(props: props) {
    return(
        <>
        <Input
            onChange={props.onChange}
            name="specialty"
            label="Специальность"
            value={props.data.specialty}
            placeholder="Повар Универсал"
            style={
                props.errors.includes("specialty")
                    ? error_style
                    : {}
            }
        />
        <Spacer top="1"/>
        <Row className={style.inputs}>
            <div className={style.city}>
                <Input
                    onChange={props.onChange}
                    name="city"
                    label="Город"
                    value={props.data.city}
                    style={
                        props.errors.includes("city")
                            ? error_style
                            : {}
                    }
                    disabled
                />
            </div>
            <div className={style.subway}>
                <SubwayInput
                    onChange={props.onChange}
                    label="Метро"
                    value={props.data.subway}
                    style={
                        props.errors.includes("subway")
                            ? error_style
                            : {}
                    }
                />
            </div>
        </Row>
        <div className={style.address}>
            <Input
                onChange={props.onChange}
                name="address"
                label="Адрес"
                value={props.data.address}
                list="my_address"
                style={
                    props.errors.includes("address")
                        ? error_style
                        : {}
                }
            />

            <datalist id="my_address">
                {props.points.map(point => {
                    return <option value={point.address}>{point.address}</option>
                })}
            </datalist>
        </div>

        <Spacer top="1"/>
        <SalaryRangeInput
        salary={props.data.salary}
        handle_change={props.onChange}
        />
        </>
    )
}