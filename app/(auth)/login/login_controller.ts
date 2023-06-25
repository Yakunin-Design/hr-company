import { useState } from "react";
import axios from "axios";
import { check_phone, check_email } from "@/functions/validation";
import { setCookie } from 'cookies-next';

export default function login_controller() {
    const [form_data, set_form_data] = useState({
        login: "",
        password: "",
    });

    const [errors, set_errors] = useState<Array<string>>([]);

    function handle_change(event: any) {
        const { name, value } = event.target;

        set_form_data(prev_form_data => {
            return {
                ...prev_form_data,
                [name]: value,
            };
        });
    }

    function sign_in() {
        if (!check_email(form_data.login) && !check_phone(form_data.login)) {
            set_errors(["login"]);
            return console.log("invalid login");
        }

        if (form_data.password.length < 8) {
            set_errors(["uncorrected_password"]);
            return console.log("invalid password");
        }

        set_errors([]);

        axios
            .post(`${process.env.API_ADDRESS}/login`, form_data)
            .then(res => {
                if (!res.data) {
                    console.log("smth wrong");
                }

                setCookie("jwt", res.data);
                localStorage.setItem("jwt", res.data);

                window.location.replace("/lk/profile");
            })
            .catch(err => {
                console.log(err);

                if (
                    err.response.data ===
                    "Account with passed cardentials was not found"
                ) {
                    set_errors(["not_found"]);
                }

                if (err.response.data === "Wrong password") {
                    set_errors(["wrong_password"]);
                }
            });
    }

    return {
        form_data,
        errors,
        sign_in,
        handle_change,
    };
}
