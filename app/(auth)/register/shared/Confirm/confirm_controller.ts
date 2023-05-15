import { useState } from "react";
import axios from "axios";

export default function confirm_controller() {
    const [can_resend_code, set_can_resend_code] = useState(true);

    const toggle_resend_code = () => set_can_resend_code(false);

    const [code_data, set_code] = useState({
        CodeValue1: "",
        CodeValue2: "",
        CodeValue3: "",
        CodeValue4: "",
    });

    function on_change(event: any) {
        const { name, value } = event.target;

        set_code(prev_code => {
            return {
                ...prev_code,
                [name]: value,
            };
        });

        const regex = /^\d{1}$/;
        if (regex.test(value)) {
            const elem_id = Number(name[name.length - 1]) + 1;
            const elem_name = name.slice(0, 9) + elem_id;

            if (name != "CodeValue4" && elem_name != "CodeValue0") {
                const elem = document.querySelector(
                    `#${elem_name}`
                ) as HTMLInputElement;
                elem.focus();
            } else {
                const elem = document.querySelector(
                    "#CodeValue4"
                ) as HTMLInputElement;
                elem.blur();
            }
        }
    }

    function clear_code() {
        const elem = document.querySelector("#CodeValue1") as HTMLInputElement;
        elem.focus();
        set_code(prev_code => {
            return {
                CodeValue1: "",
                CodeValue2: "",
                CodeValue3: "",
                CodeValue4: "",
            };
        });
        return;
    }

    function send_code_to_api() {
        const code = Number(
            `${code_data.CodeValue1}` +
                `${code_data.CodeValue2}` +
                `${code_data.CodeValue3}` +
                `${code_data.CodeValue4}`
        );

        const tmp_id = localStorage.getItem("tmp_id");

        if (!tmp_id) {
            return console.log("no tmp_id");
        }

        const data = {
            id: tmp_id,
            code,
        };

        axios
            .post(`${process.env.API_ADDRESS}/phone-confirmation`, data)
            .then(res => {
                if (!res.data) {
                    return console.log("invalid code");
                }

                localStorage.removeItem("tmp_id");
                localStorage.setItem("jwt", res.data);

                window.location.replace("/lk/profile");
            });
    }

    async function registration_api_call(data: any) {
        data.payload.phone = data.payload.phone
            .replace(/\s/g, "")
            .split("(")
            .join("")
            .split(")")
            .join("");

        const response = await axios.post(`${process.env.API_ADDRESS}/signup`, data);

        return response;
    }

    async function resend_code(data: any) {
        clear_code();

        if (can_resend_code) {
            set_can_resend_code(false);

            // resend code
            await registration_api_call(data);
            console.log("code send");
        }
    }

    return {
        can_resend_code,
        code_data,
        toggle_resend_code,
        send_code_to_api,
        on_change,
        clear_code,
        registration_api_call,
        resend_code,
    };
}
