import axios from "axios";

type worker_data = {
    full_name: string,
    citizenship: "ru" | "bu/uk" | "sng" | "other",
    specialty: string,
    email: string,
    birthday: string,
    status: "ready" | "not ready",
    city: "Санкт-Петербург" | "Москва",
    job_type: "any" | "full_time" | "part_time"
}

export default async function get_data(id: string): Promise<worker_data> { 
	const uri = `${process.env.API_ADDRESS}/get-worker-by-id/${id}`;
	const res = await axios.get(uri);

  	if (!res) {
		throw new Error("data fetch failed");
  	}
 
  	return res.data;
}
