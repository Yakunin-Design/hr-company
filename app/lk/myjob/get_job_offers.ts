import axios from "axios";
import { cookies } from "next/headers";

export default async function get_job_offers() {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const config = {
        headers: {
            authorization: "Bearer " + jwt,
        },
    };

    const job_offers = await axios.get(
        `${process.env.API_ADDRESS}/get-jobs-by-worker-id`,
        config
    );

    return job_offers.data;
}
