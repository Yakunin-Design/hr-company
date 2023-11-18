import axios from "axios";
import { cookies } from "next/headers";

export default async function get_data() {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    const db_schools = await axios.get(
        `${process.env.API_ADDRESS}/schools`,
        config
    );

    return db_schools.data;
}
