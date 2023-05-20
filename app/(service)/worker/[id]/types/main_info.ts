export type main_info = {
	is_ready: boolean,
	job_type: "Любая" | "Полная" | "Частичная",
	education?: string,
	age: number,
	citizenship: "РФ" | "Беларусь / Украина" | "СНГ" | "Другое",
	subway?: string,
	city?: "Санкт-Петербург"
}
