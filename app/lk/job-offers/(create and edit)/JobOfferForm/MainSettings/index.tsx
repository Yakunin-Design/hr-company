import Input from "@/components/std/Inputs/Input"
import Row from "@/components/std/Row"
import Spacer from "@/components/std/Spacer"

import style from "./mainS.module.css"
import ExperienceInput from "./ExperienceInput"

type form_data = {
    experience: string,
    schedule: {
        weekdays: string,
        weekends: string,
    },
    working_time: {
        start: string,
        end: string,
    },
}

type props = {
    data: form_data,
    errors: Array<string>
    onChange: (event: any) => void
}

const error_style = {
    border: "2px solid red",
};

export default function mainSettings(props: props) {
    return(
        <>
            <ExperienceInput 
                experience={props.data.experience}
                handle_change={props.onChange}
                />
            <Spacer top="6"/>

            <Row className={style.schedule}>
                <div className={style.double_input}>
                    <h3>График</h3>
                    <Spacer top="2"/>
                    <Row className={style.double_input_block}>
                        <div>
                            <Input
                                onChange={props.onChange}
                                name="weekdays"
                                label="Рабочие"
                                value={props.data.schedule.weekdays}
                                placeholder="0"
                                type="tel"
                                maxLength={1}
                                className={style.week_input}
                                style={
                                    props.errors.includes("weekdays")
                                        ? error_style
                                        : {}
                                }
                            />
                        </div>
                        <span className={style.span + " --v2"}>Через</span>
                        <div>
                            <Input
                                onChange={props.onChange}
                                name="weekends"
                                label="Выходные"
                                value={props.data.schedule.weekends}
                                placeholder="0"
                                maxLength={1}
                                type="tel"
                                className={style.week_input}
                                style={
                                    props.errors.includes("weekends")
                                        ? error_style
                                        : {}
                                }
                            />
                        </div>
                    </Row>
                </div>
                <div className={style.double_input}>
                    <h3>Рабочее время</h3>
                    <Spacer top="2"/>
                    <Row className={style.double_input_block}>
                        <div>
                            <Input
                                onChange={props.onChange}
                                name="wt-start"
                                label="C"
                                value={props.data.working_time.start}
                                placeholder="9:00"
                                maxLength={5}
                                className={style.time_input}
                                style={
                                    props.errors.includes("weekdays")
                                        ? error_style
                                        : {}
                                }
                            />
                        </div>
                        <div>
                            <Input
                                onChange={props.onChange}
                                name="wt-end"
                                label="По"
                                value={props.data.working_time.end}
                                placeholder="21:00"
                                maxLength={5}
                                className={style.time_input}
                                style={
                                    props.errors.includes("weekends")
                                        ? error_style
                                        : {}
                                }
                            />
                        </div>
                    </Row>
                </div>
            </Row>
        </>
    )
}