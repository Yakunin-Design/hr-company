import { useState } from "react";
import Compressor from "compressorjs";
import {
    check_day,
    check_month,
    check_year,
    check_full_name,
    check_phone,
    check_email,
} from "@/functions/validation";

export default function user_controller() {
    /**
     * ------------- UTILITY -------------
     */
    const [show_save_btn, set_show_save_btn] = useState(false);
    const [edit_errors, set_edit_errors] = useState([]);
    const [edits, set_edits] = useState<Array<any>>([]);
    /**
     * ------------- DATA -------------
     */
    const [user, set_user] = useState({
        user_type: "",
        user_data: {
            _id: "",
            birthday: "",
            citizenship: "",
            email: "",
            full_name: "",
            phone: "",
            specialty: [],
            status: "",
            subway: "",
            district: "",
            job_type: "any",
            salary: {
                amount: 100,
                period: "month",
            },
        },
    });
    /**
     * ------------- INPUT CONTROLLERS -------------
     */
    function handleChange(event: any) {
        const { name, value, type, checked, files } = event.target;

        set_show_save_btn(true);

        set_edits(prev => prev.filter(edit => edit != name));
        set_edits(prev => [...prev, name]);

        if (name === "amount") {
            set_user(prev => {
                return {
                    ...prev,
                    salary: {
                        amount: value,
                        period: prev.user_data.salary.period,
                    },
                };
            });
        } else if (name === "period") {
            set_user(prev => {
                return {
                    ...prev,
                    salary: {
                        amount: prev.user_data.salary.amount,
                        period: value,
                    },
                };
            });
        } else if (name === "logo") {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                if (this.result) {
                    set_user(prev_user => {
                        return {
                            ...prev_user,
                            user_data: {
                                ...prev_user.user_data,
                                logo: this.result,
                            },
                        };
                    });
                }
            });

            const file = files[0];
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    reader.readAsDataURL(result);
                },
            });
        } else if (name === "month") {
            const birthday = user.user_data.birthday.split(".");
            set_user(prev_user_data => {
                return {
                    ...prev_user_data,
                    user_data: {
                        ...prev_user_data.user_data,
                        birthday: `${birthday[0]}.${value}.${birthday[2]}`,
                    },
                };
            });
        } else {
            set_user(prev_user_data => {
                return {
                    ...prev_user_data,
                    user_data: {
                        ...prev_user_data.user_data,
                        [name]: value,
                    },
                };
            });
        }
    }

    /**
     * ------------- SEND TO API -------------
     */
    function save_data() {
        console.log(user.user_data);
    }

    return { user, set_user, handleChange, save_data, show_save_btn };
}
