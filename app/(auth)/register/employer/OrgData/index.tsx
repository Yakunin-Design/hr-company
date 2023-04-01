import Input from "@/components/std/Inputs/Input";
import PhotoInput from "@/components/std/Inputs/PhotoInput";
import Spacer from "@/components/std/Spacer";

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

const error_style = {
    border: "2px solid red",
};

export default function OrgData(props: props) {
    return (
        <>
            <h2>Регистрация</h2>

            <Spacer top={2} />
            <PhotoInput
                name="logo"
                onChange={props.onChange}
                value={props.form_data.logo ? props.form_data.logo : ""}
            />

            <Spacer top={2} />
            <Input
                name="company"
                label="Название заведения"
                onChange={props.onChange}
                style={props.err.includes("company") ? error_style : {}}
                value={props.form_data.company}
            />

            <Spacer top={2} />
            <Input
                name="inn"
                label="ИНН"
                onChange={props.onChange}
                style={props.err.includes("inn") ? error_style : {}}
                value={props.form_data.inn}
                type="tel"
                maxLength={12}
            />
        </>
    );
}
