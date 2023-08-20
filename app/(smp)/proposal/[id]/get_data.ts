import axios from "axios";
import { cookies } from "next/headers";

export default async function get_data(id: string) {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    const uri = `${process.env.API_ADDRESS}/proposal/${id}`;
    const res = await axios.get(uri, config);

    if (!res) {
        throw new Error("data fetch failed");
    }

    const jo_data = res.data;
    return jo_data;
}
