import Input from "@/components/std/Inputs/Input";
import PasswordInput from "@/components/std/Inputs/PasswordInput";
import PhoneInput from "@/components/std/Inputs/PhoneInput";
import Spacer from "@/components/std/Spacer";

type form_data = {
    full_name: string,
    day: string | number,
    month: string,
    year: string | number,
    citizenship: string,
    specialty: string,
    phone: string,
    email: string,
    password: string,
    password_confirmation: string,
    company: string,
    inn: string | number,
    logo?: string,
}


type props = {
    err: Array<any>
    onChange: (event: any) => void;
    form_data: form_data
}

export default function Contacts(props: props) {

    const error_style = {
        border: '2px solid red'
    } 

    return (
        <>
            <h2>Контакты</h2>
            <Spacer top={2} />
            <PhoneInput 
                name="phone"
                label="Номер Телефона"
                value={props.form_data.phone}
                style={props.err.includes('phone') ? error_style : {}}
                onChange={props.onChange}
                placeholder="+7 (911) 123 45 67"
            />

            <Spacer top={2} />
            <Input 
                name="email"
                label="Email"
                value={props.form_data.email}
                style={props.err.includes('email') ? error_style : {}}
                onChange={props.onChange}
                placeholder="mail@example.com"
            />

            <Spacer top={2} />
            <PasswordInput 
                name="password"
                label="Создание Пароля"
                value={props.form_data.password}
                style={props.err.includes('password') ? error_style : {}}
                onChange={props.onChange}
                placeholder="Введите Пароль"
            />

            <Spacer top={1} />
            <PasswordInput 
                name="password_confirmation"
                label="Подтверждение Пароля"
                value={props.form_data.password_confirmation}
                style={props.err.includes('password_confirmation') ? error_style : {}}
                onChange={props.onChange}
                placeholder="Подтвердите пароль"
            />
        </>
    );
}
