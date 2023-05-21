import { worker_data } from "./worker_data";
import { main_info } from "./main_info";

export type worker_page_data = {
	main_info: main_info,
	avatar: string,
	full_name: string,
	specialtes: string[],
	documents: {},
}
