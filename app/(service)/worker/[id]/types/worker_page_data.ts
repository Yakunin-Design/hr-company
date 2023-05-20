import { worker_data, main_info } from "./worker_data";

export type worker_page_data = {
	main_info: main_info,
	avatar: string,
	full_name: string,
	specialtes: string[],
	documents: {},
}
