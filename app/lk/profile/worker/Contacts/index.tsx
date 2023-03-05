import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import PhoneInput from "@/components/std/Inputs/PhoneInput";
import Radio from "@/components/std/Inputs/Radio";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import style from "./contacts.module.css";

type props = {
    handle_change: (event: any) => void;
    status: string;
    phone: string;
    email: string;
};

export default function Contacts(props: props) {
    return (
        <Card>
            <h3>Статус</h3>
            <Spacer top="1" />
            <Row className={style.status}>
                <Radio
                    name="status"
                    value="ready"
                    currentValue={props.status}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    Готов
                </Radio>

                <Radio
                    name="status"
                    value="not ready"
                    currentValue={props.status}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    Не готов
                </Radio>
            </Row>

            <Spacer top="2" />
            <Row className={style.contacts}>
                <div className={style.email}>
                    <Input
                        name="email"
                        onChange={props.handle_change}
                        placeholder="email@example.com"
                        label="Почта"
                        value={props.email}
                    />
                </div>

                <div className={style.phone}>
                    <PhoneInput
                        name="phone"
                        onChange={props.handle_change}
                        placeholder="+7 (999) 999-99-99"
                        label="Телефон"
                        value={props.phone}
                    />
                </div>
            </Row>
        </Card>
    );
}
