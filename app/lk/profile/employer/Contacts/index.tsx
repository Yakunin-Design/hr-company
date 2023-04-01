import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import PhoneInput from "@/components/std/Inputs/PhoneInput";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import EmpolyerData from "@/types/EmployerData";

import style from "./contacts.module.css";

type props = {
    user_data: EmpolyerData;
    handle_change: (event: any) => void;
};

export default function Contacts(props: props) {
    return (
        <Card>
            <Input
                name="full_name"
                onChange={props.handle_change}
                label="ФИО"
                placeholder="Фамилия Имя Отчество"
                value={props.user_data.full_name}
            />

            <Spacer top="2" />
            <Row className={style.contact_row}>
                <div className={style.email}>
                    <Input
                        name="email"
                        onChange={props.handle_change}
                        label="Email"
                        placeholder="mail@domain.com"
                        value={props.user_data.email}
                    />
                </div>
                <div className={style.phone}>
                    <PhoneInput
                        name="phone"
                        onChange={props.handle_change}
                        label="Телефон"
                        placeholder="+7 (000) 000 00 00"
                        value={props.user_data.phone}
                    />
                </div>
            </Row>
        </Card>
    );
}
