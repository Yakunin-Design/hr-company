import axios from "axios";

export default async function get_data(id: string) {
    const uri = `${process.env.API_ADDRESS}/smp-job-offers/${id}`;
    const res = await axios.get(uri);

    if (!res) {
        throw new Error("data fetch failed");
    }

    const jo_data = res.data;

    return jo_data;
}
