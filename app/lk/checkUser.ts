"use client";
import { useEffect } from "react";
import axios from "axios";

export function CheckUser(set_user: any) {
    useEffect(() => {
        const jwt = localStorage.getItem("jwt") || "";

        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .get("http://localhost:6969/profile", config)
            .then(res => {
                if (!res.data) {
                    return console.log("bruh");
                }

                set_user({
                    user_type: res.data.specialty ? "worker" : "employer",
                    user_data: res.data,
                });

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
