"use client";
import { useEffect } from "react";
import axios from "axios";
import user_controller from "../user_controller";

export default function Home() {
    const { set_user } = user_controller();

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
                localStorage.setItem(
                    "user_type",
                    res.data.specialty ? "worker" : "employer"
                );
                window.location.replace("/lk/profile");
            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace("/login");
                }
                if (e.response.status === 404) {
                    localStorage.removeItem("jwt");
                    window.location.reload();
                }
                else {
                    console.log('e is undefined')
                }
            });
    }, []);

    return (
        <html lang="en">
            <head />
            <body>
                <h2>Loading</h2>
            </body>
        </html>
    );
}
