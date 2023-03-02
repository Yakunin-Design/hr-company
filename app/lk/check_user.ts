import axios, { AxiosResponse } from "axios";

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

export default async function check_user() {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) window.location.replace("/login");

    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    const user = await axios.get("http://localhost:6969/profile", config);

    if (user.status != 200) {
        localStorage.removeItem("jwt");
        window.location.replace("/login");
    }

    const user_type = localStorage.getItem("user_type");
    if (user_type != ("worker" || "emplyer")) {
        localStorage.setItem(
            "user_type",
            user.data.specialty ? "worker" : "employer"
        );
    }
}
