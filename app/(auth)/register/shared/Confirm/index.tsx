"use client"
import Button from "@/components/std/Button";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import ConfirmInput from "./ConfirmInput";
import confirm_controller from "./confirm_controller";
import { useEffect } from "react";

export default function Confirm(data: any) {

    const {
        code_data,
        send_code_to_api,
        on_change,
        resend_code,
        clear_code,
        registration_api_call
    } = confirm_controller();

    useEffect(() => {
        registration_api_call(data.data)
            .then((res) => {
                localStorage.setItem('tmp_id', res.data)
            })
            .catch()
    }, []);

    return (
        <>
            <h2>Подтверждение</h2>
            <Spacer top={1}/>
            <p className="--v2">Пожалуйста введите код из смс сообщения. Код был отправлен на номер: {data.data.payload.phone}</p>
            <Spacer top={1}/>
            <Row onClick={clear_code}>
                <ConfirmInput name="CodeValue1" onChange={on_change} value={code_data.CodeValue1}/>
                <ConfirmInput name="CodeValue2" onChange={on_change} value={code_data.CodeValue2}/>
                <ConfirmInput name="CodeValue3" onChange={on_change} value={code_data.CodeValue3}/>
                <ConfirmInput name="CodeValue4" onChange={on_change} value={code_data.CodeValue4}/>
            </Row>
            <Spacer top={3}/>
            <Button secondary expand onClick={() => resend_code(data.data)}>Отправить код повторно</Button>
            <Spacer top={1}/>
            <Button expand onClick={send_code_to_api}>Завершить регистрацию</Button>
        </>
    );
}
