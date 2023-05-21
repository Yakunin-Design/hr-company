import axios from "axios";
import { worker_page_data } from "./types/worker_page_data";
import { main_info } from "./types/main_info";
import get_age from "@/functions/get_age";

export default async function get_data(id: string): Promise<worker_page_data> {
    const uri = `${process.env.API_ADDRESS}/get-worker-by-id/${id}`;
    const res = await axios.get(uri);

    if (!res) {
        throw new Error("data fetch failed");
    }

    const worker = res.data;

    const main: main_info = {
		is_ready: worker.status === "ready" ? true : false,
        job_type:
            worker.job_type === "full_time"
                ? "Полная"
                : worker.job_type === "part_time"
                ? "Частичная"
                : "Любая",
        age: get_age(worker.birthday),
        citizenship:
            worker.citizenship === "ru"
                ? "РФ"
                : worker.citizenship === "bu/ua"
                ? "Беларусь / Украина"
                : worker.citizenship === "sng"
                ? "СНГ"
                : "Другое",
        subway: worker.subway || "",
        city: worker.city,
    };

    const worker_page_data: worker_page_data = {
        avatar: worker.logo || "empty",
        full_name: worker.full_name,
        main_info: main,
        specialtes: worker.specialty,
        documents: [],
    };

    return worker_page_data;
}
