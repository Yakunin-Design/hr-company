import WorkerData from "@/types/WorkerData";

import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import Radio from "@/components/std/Inputs/Radio";
import Select from "@/components/std/Inputs/Select";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import style from "./maininfo.module.css";
import Avatar from "@/components/Avatar";

type props = {
    user_data: WorkerData;
    handle_change: (event: any) => void;
    edit_errors: Array<string>;
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

const error_style = {
    border: "2px solid red",
};

export default function MainInfo(props: props) {

    return (
        <Card className={style.personal_block}>
            <Avatar
                value={props.user_data.logo}
                input
                onChange={props.handle_change}
            />

            <Spacer top="2" />
            <Input
                name="full_name"
                placeholder="Фамилия Имя Отчество"
                label="ФИО"
                value={props.user_data.full_name}
                onChange={props.handle_change}
                style={
                    props.edit_errors.includes("full_name") ? error_style : {}
                }
            />
            <Spacer top="2" />

            <h3>Дата Рождения</h3>
            <Spacer top="1" />
            <Row>
                <Input
                    name="day"
                    placeholder="00"
                    type="tel"
                    onChange={props.handle_change}
                    maxLength={2}
                    value={props.user_data.birthday.split(".")[0]}
                    style={props.edit_errors.includes("day") ? error_style : {}}
                    className={style.day}
                />

                <Spacer left="1" />
                <Select
                    name="month"
                    onChange={props.handle_change}
                    style={
                        props.edit_errors.includes("month") ? error_style : {}
                    }
                    value={props.user_data.birthday.split(".")[1]}
                    options={options}
                    className={style.month}
                />

                <Spacer left="1" />
                <Input
                    name="year"
                    placeholder="0000"
                    type="tel"
                    onChange={props.handle_change}
                    maxLength={4}
                    style={
                        props.edit_errors.includes("year") ? error_style : {}
                    }
                    value={props.user_data.birthday.split(".")[2]}
                    className={style.year}
                />
            </Row>

            <Spacer top="2" />
            <h3>Гражданство</h3>
            <Spacer top="1" />
            <Row className={style.citizenship}>
                <Radio
                    name="citizenship"
                    value="ru"
                    currentValue={props.user_data.citizenship}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    🇷🇺
                </Radio>

                <Radio
                    name="citizenship"
                    value="bu/ua"
                    currentValue={props.user_data.citizenship}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    🇧🇾/🇺🇦
                </Radio>

                <Radio
                    name="citizenship"
                    value="sng"
                    currentValue={props.user_data.citizenship}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    СНГ
                </Radio>

                <Radio
                    name="citizenship"
                    value="other"
                    currentValue={props.user_data.citizenship}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    Другое
                </Radio>
            </Row>
        </Card>
    );
}
