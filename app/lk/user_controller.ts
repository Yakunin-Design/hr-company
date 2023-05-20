//@ts-nocheck
import { useState } from "react";
import Compressor from "compressorjs";
import axios from "axios";
import subway_stations from "@/components/std/Inputs/SubwayInput/subway_stations";
import {
    check_day,
    check_month,
    check_year,
    check_full_name,
    check_phone,
    check_email,
} from "@/functions/validation";


type user = {
    user_type: string,
    user_data: {
        _id: string,
        birthday: string,
        citizenship: string,
        email: string,
        full_name: string,
        phone: string,
        specialty: [],
        status: string,
        city: "Санкт-Петербург",
        district: string,
        subway: string,
        job_type: string,
        salary: {
            amount: number,
            period: string,
        },
        inn: string,
        company: string,
        description: string,
    },
}

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
    const [user, set_user] = useState<user>({
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
            city: "Санкт-Петербург",
            district: "",
            subway: "",
            job_type: "any",
            salary: {
                amount: 100,
                period: "month",
            },
            inn: "",
            company: "",
            description: "",
        },
    });
    /**
     * ------------- INPUT CONTROLLERS -------------
     */
    function handleChange(event: any) {
        const { name, value, files } = event.target;

        set_show_save_btn(true);

        set_edits(prev => prev.filter(edit => edit != name));
        set_edits(prev => [...prev, name]);

        if (name === "amount") {
            set_user(prev => {
                return {
                    ...prev,
                    user_data: {
                        ...prev.user_data,
                        salary: {
                            amount: value,
                            period: prev.user_data.salary.period,
                        },
                    },
                };
            });
        } else if (name === "period") {
            set_user(prev => {
                return {
                    ...prev,
                    user_data: {
                        ...prev.user_data,
                        salary: {
                            amount: prev.user_data.salary.amount,
                            period: value,
                        },
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
        } else if (name === "day") {
            const birthday = user.user_data.birthday.split(".");
            set_user(prev_user_data => {
                return {
                    ...prev_user_data,
                    user_data: {
                        ...prev_user_data.user_data,
                        birthday: `${value}.${birthday[1]}.${birthday[2]}`,
                    },
                };
            });
        } else if (name === "year") {
            const birthday = user.user_data.birthday.split(".");
            set_user(prev_user_data => {
                return {
                    ...prev_user_data,
                    user_data: {
                        ...prev_user_data.user_data,
                        birthday: `${birthday[0]}.${birthday[1]}.${value}`,
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
        let data = {};
        const err: Array<String> = [];

        if (user.user_type === "employer") {
            data = employer_valid(edits, err);
        } else {
            data = worker_valid(edits, err);
        }

        set_edit_errors(err);

        if (
            typeof err["day"] == "undefined" &&
            typeof err["month"] == "undefined" &&
            typeof err["year"] == "undefined"
        ) {
            if (typeof data["day"] !== "undefined") {
                if (typeof data["birthday"] !== "undefined") {
                    const old_birthday = data.birthday.split(".");
                    data.birthday = `${data.day}.${old_birthday[1]}.${old_birthday[2]}`;
                } else {
                    const old_birthday = user.user_data.birthday.split(".");
                    data.birthday = `${data.day}.${old_birthday[1]}.${old_birthday[2]}`;
                }
                delete data.day;
            }

            if (typeof data["month"] !== "undefined") {
                if (typeof data["birthday"] !== "undefined") {
                    const old_birthday = data.birthday.split(".");
                    data.birthday = `${old_birthday[0]}.${data.month}.${old_birthday[1]}`;
                } else {
                    const old_birthday = user.user_data.birthday.split(".");
                    data.birthday = `${old_birthday[0]}.${data.month}.${old_birthday[1]}`;
                }
                delete data.month;
            }

            if (typeof data["year"] !== "undefined") {
                if (typeof data["birthday"] !== "undefined") {
                    const old_birthday = data.birthday.split(".");
                    data.birthday = `${old_birthday[0]}.${old_birthday[1]}.${data.year}`;
                } else {
                    const old_birthday = user.user_data.birthday.split(".");
                    data.birthday = `${old_birthday[0]}.${old_birthday[1]}.${data.year}`;
                }
                delete data.year;
            }
        }

        if (err.length == 0) {
            set_show_save_btn(false);
        }

        const config = {
            headers: {
                authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        };

        if (Object.keys(data).length > 0) {
            axios
                .post(`${process.env.API_ADDRESS}/profile/edit`, { ...data }, config)
                .then(res => {
                    if (!res.data) {
                        return console.log(res);
                    }
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
    }

    /*
     * ------------- Validation -------------
     */

    function worker_valid(edits: Array<any>, err: Array<String>) {
        let data = {};
        edits.forEach(edit => {
            if (edit === "full_name") {
                check_full_name(user.user_data[edit])
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "email") {
                check_email(user.user_data[edit])
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "phone") {
                check_phone(user.user_data[edit])
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "day") {
                check_day(user.user_data.birthday.split(".")[0])
                    ? (data[edit] = user.user_data.birthday.split(".")[0])
                    : err.push(edit);
            }
            if (edit === "month") {
                check_month(user.user_data.birthday.split(".")[1])
                    ? (data[edit] = user.user_data.birthday.split(".")[1])
                    : err.push(edit);
            }
            if (edit === "year") {
                check_year(user.user_data.birthday.split(".")[2])
                    ? (data[edit] = user.user_data.birthday.split(".")[2])
                    : err.push(edit);
            }
            if (edit === "amount" || edit === "period") {
                data.salary = user.user_data.salary;
            }
            if (edit === "subway") {
                subway_stations.includes(user.user_data.subway)
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (
                edit === "citizenship" ||
                edit === "status" ||
                edit === "logo" ||
                edit === "job_type" ||
                edit === "subway" ||
                edit === "district"
            ) {
                data[edit] = user.user_data[edit];
            }
        });
        return data;
    }

    function employer_valid(edits: Array<any>, err: Array<String>) {
        let data = {};
        edits.forEach(edit => {
            if (edit === "full_name") {
                check_full_name(user.user_data[edit])
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "email") {
                check_email(user.user_data[edit])
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "phone") {
                //@ts-ignore
                check_phone(user.user_data[edit])
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "description") {
                //@ts-ignore
                user.user_data[edit].length >= 20 &&
                //@ts-ignore
                user.user_data[edit].length <= 120
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "company") {
                //@ts-ignore
                user.user_data[edit].length >= 3 &&
                //@ts-ignore
                user.user_data[edit].length <= 40
                    ? (data[edit] = user.user_data[edit])
                    : err.push(edit);
            }
            if (edit === "logo") {
                data[edit] = user.user_data[edit];
            }
        });
        return data;
    }

    return {
        user,
        set_user,
        handleChange,
        save_data,
        show_save_btn,
        edit_errors,
    };
}
