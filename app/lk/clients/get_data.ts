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

    const db_clients = await axios.get(
        `${process.env.API_ADDRESS}/clients`,
        config
    );

    return db_clients.data;
}
