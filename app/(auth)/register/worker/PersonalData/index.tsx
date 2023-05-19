import Input from "@/components/std/Inputs/Input";
import PhotoInput from "@/components/std/Inputs/PhotoInput";
import Radio from "@/components/std/Inputs/Radio";
import Select from "@/components/std/Inputs/Select";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import style from "./personaldata.module.css";

type form_data = {
    full_name: string;
    day: string | number;
    month: string;
    year: string | number;
    citizenship: string;
    specialty: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
    company: string;
    inn: string | number;
    logo?: string;
};

type props = {
    err: Array<any>;
    onChange: (event: any) => void;
    form_data: form_data;
};

export default function PersonalData(props: props) {
    const error_style = {
        border: "2px solid red",
    };

    const options = [
        "Месяц",
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];

    return (
        <>
            <h2>Регистрация</h2>

            <Spacer top="2" />
            <PhotoInput
                name="logo"
                onChange={props.onChange}
                value={props.form_data.logo ? props.form_data.logo : ""}
            />

            <Spacer top="2" />
            <Input
                name="full_name"
                label="ФИО"
                placeholder="Фамилия Имя Отчество"
                onChange={props.onChange}
                style={props.err.includes("full_name") ? error_style : {}}
                value={props.form_data.full_name}
            />

            <Spacer top="2" />
            <h3>Дата Рождения</h3>
            <Spacer top="1" />

            <Row>
                <Input
                    name="day"
                    placeholder="00"
                    type="tel"
                    onChange={props.onChange}
                    maxLength={2}
                    style={props.err.includes("day") ? error_style : {}}
                    value={props.form_data.day}
                    className={style.day}
                />

                <Spacer left="1" />
                <Select
                    name="month"
                    onChange={props.onChange}
                    style={props.err.includes("month") ? error_style : {}}
                    value={props.form_data.month}
                    options={options}
                    className={style.month}
                />

                <Spacer left="1" />
                <Input
                    name="year"
                    placeholder="0000"
                    type="tel"
                    onChange={props.onChange}
                    maxLength={4}
                    style={props.err.includes("year") ? error_style : {}}
                    value={props.form_data.year}
                    className={style.year}
                />
            </Row>

            <Spacer top="2" />
            <h3>Гражданство</h3>
            <Spacer top="1" />
            <Row className={style.citizenships}>
                <Radio
                    name="citizenship"
                    value="ru"
                    currentValue={props.form_data.citizenship}
                    onChange={props.onChange}
                    className={style.citizenship}
                    style={props.err.includes("citizenship") ? error_style : {}}
                >
                    🇷🇺
                </Radio>

                <Radio
                    name="citizenship"
                    value="bu/ua"
                    currentValue={props.form_data.citizenship}
                    onChange={props.onChange}
                    style={props.err.includes("citizenship") ? error_style : {}}
                    className={style.citizenship}
                >
                    🇧🇾/🇺🇦
                </Radio>

                <Radio
                    name="citizenship"
                    value="sng"
                    currentValue={props.form_data.citizenship}
                    onChange={props.onChange}
                    style={props.err.includes("citizenship") ? error_style : {}}
                    className={style.citizenship}
                >
                    СНГ
                </Radio>

                <Radio
                    name="citizenship"
                    value="other"
                    currentValue={props.form_data.citizenship}
                    onChange={props.onChange}
                    style={props.err.includes("citizenship") ? error_style : {}}
                    className={style.citizenship}
                >
                    Другое
                </Radio>
            </Row>

            <Spacer top="2" />
            <Input
                name="specialty"
                label="Специальность"
                placeholder="Повар-универсал"
                onChange={props.onChange}
                style={props.err.includes("specialty") ? error_style : {}}
                value={props.form_data.specialty}
            />
        </>
    );
}
