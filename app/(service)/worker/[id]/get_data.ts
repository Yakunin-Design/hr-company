import axios from "axios";
import { worker_data, main_info } from "./worker_data";
import get_age from "@/functions/get_age";

export default async function get_data(id: string): Promise<worker_data> {
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

    // const doc: worker_data = {
    //     documents: worker.documents.passport
    //         ? "Паспорт РФ"
    //         : worker.documents.medical_book
    //         ? "Мед. нижка"
    //         : worker.documents.employment_book
    //         ? "Трудовая книжка"
    //         : "Нет документов",
    // };

    const documents: string[] = [];

    const passport = worker.documents.passport ? "Паспорт РФ" : false;
    if (passport) documents.push(passport);

    const medical_book = worker.documents.medical_book ? "Мед. нижка" : false;
    if (medical_book) documents.push(medical_book);

    const employment_book = worker.documents.employment_book
        ? "Трудовая книжка"
        : false;
    if (employment_book) documents.push(employment_book);

    const worker_page_data: worker_data = {
        avatar: worker.logo || "empty",
        full_name: worker.full_name,
        main_info: main,
        specialtes: worker.specialty,
        documents: documents,
    };

    return worker_page_data;
}
