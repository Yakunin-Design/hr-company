"use client";
import { useEffect } from "react";
import axios from "axios";
import { setCookie } from 'cookies-next';

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

export function CheckUser(user: user, set_user: any) {
    useEffect(() => {
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .get(`${process.env.API_ADDRESS}/profile`, config)
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                set_user({
                    user_type: res.data.specialty ? "worker" : "employer",
                    user_data: {
                        ...user.user_data,
                        ...res.data
                    },
                });

                setCookie("jwt", jwt);

                if (
                    localStorage.getItem("user_type") != "worker" ||
                    localStorage.getItem("user_type") != "employer"
                ) {
                    localStorage.setItem(
                        "user_type",
                        res.data.specialty ? "worker" : "employer"
                    );
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace("/login");
                }
                if (e.response.status === 404) {
                    localStorage.removeItem("jwt");
                    window.location.reload();
                } else {
                    console.log("e is undefined");
                }
            });
    }, []);
    return true;
}
