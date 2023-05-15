import Image from "next/image"
import Row from "@/components/std/Row"
import Spacer from "@/components/std/Spacer"
import style from "./advancedS.module.css"
import Radio from "@/components/std/Inputs/Radio"
import man from "@/assets/svg/man.svg"
import woman from "@/assets/svg/woman.svg"
import Input from "@/components/std/Inputs/Input"
import TextArea from "@/components/std/Inputs/TextArea"

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

type props = {
    data: form_data,
    errors: Array<string>
    onChange: (event: any) => void
}

export default function defaultSettings(props: props) {
    return(
        <>
        <h3>Гражданство</h3>
        <Spacer top="1" />
        <Row className={style.citizenship}>
            <Radio
                name="citizenship"
                value="ru"
                currentValue={props.data.citizenship}
                onChange={props.onChange}
                style={{}}
                checked={true}
                lk
            >
                🇷🇺
            </Radio>

            <Radio
                name="citizenship"
                value="bu/ua"
                currentValue={props.data.citizenship}
                onChange={props.onChange}
                style={{}}
                checked={props.data.citizenship != "ru"}
                lk
            >
                🇧🇾/🇺🇦
            </Radio>

            <Radio
                name="citizenship"
                value="sng"
                currentValue={props.data.citizenship}
                onChange={props.onChange}
                style={{}}
                checked={props.data.citizenship != "ru" && props.data.citizenship != "bu/ua"}
                lk
            >
                СНГ
            </Radio>

            <Radio
                name="citizenship"
                value="other"
                currentValue={props.data.citizenship}
                onChange={props.onChange}
                style={{}}
                checked={props.data.citizenship == "other"}
                lk
            >
                Любое
            </Radio>
        </Row>


        <Spacer top="2"/>
        <h3>Пол</h3>
        <Spacer top="1" />
        <Row className={style.sex}>
            <Radio
                name="sex"
                value="any"
                currentValue={props.data.sex}
                onChange={props.onChange}
                style={{}}
                lk
            >
                Любой
            </Radio>

            <Radio
                name="sex"
                value="male"
                currentValue={props.data.sex}
                onChange={props.onChange}
                style={{}}
                lk
            >
                <Image src={man} alt="man"/>
            </Radio>

            <Radio
                name="sex"
                value="female"
                currentValue={props.data.sex}
                onChange={props.onChange}
                style={{}}
                lk
            >
                <Image src={woman} alt="man"/>
            </Radio>
        </Row>

        <Spacer top="2"/>
        <div>
            <h3>Возраст</h3>
            <Spacer top="1" />
            <Row className={style.age}>
                <Input
                    name="age_from"
                    value={props.data.age.from}
                    label="от"
                    type="tel"
                    onChange={props.onChange}
                    className={style.age_input}
                    maxLength={2}
                />
                <Input
                    name="age_to"
                    value={props.data.age.to}
                    label="до"
                    type="tel"
                    onChange={props.onChange}
                    maxLength={2}
                    className={style.age_input}
                />
            </Row>
        </div>

        <Spacer top="2"/>
        <div>
            <TextArea
                name="description"
                label="Требования и компетенции"
                value={props.data.description}
                onChange={props.onChange}
                className={style.textarea}
                placeholder="Обязанности: - - Требования: - - Условия: - -"
            />
        </div>
        </>
    )
}