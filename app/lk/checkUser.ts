import axios from "axios";
import user_controller from "./user_controller";

/*
This solution is crappy & should be redone in 'the right way'.
The thing is: we are not is React land anymore, so we can do cool stuff!
Problem description: 

What we do now:
    1. read local storage
    2. sent req to api with jwt
    3. set user data to local storage
    4. send req to get according page

What we should be doing:

    1. send req with jwt
    2. get relevant SSR page


P.S. all of that crap is not type safe, bc for some reason we are still not using Zod

*/

export default function CheckUser() {
    const { set_user } = user_controller();

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
                console.log("ERROR: e is undefined");
            }
        });
}
