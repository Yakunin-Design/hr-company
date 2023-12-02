export default function get_age(birthday: string): number {
    const birthday_arr = birthday.split(".");
    const day = parseInt(birthday_arr[0]) + 1;
    const month = parseInt(birthday_arr[1]);
    const year = parseInt(birthday_arr[2]);

    const now_date = new Date();
    const birthday_time = new Date(`${year}.${month}.${day}`);

    let age = now_date.getFullYear() - birthday_time.getFullYear();
    const months = now_date.getMonth() - birthday_time.getMonth();
    if (
        months < 0 ||
        (months === 0 && now_date.getDate() < birthday_time.getDate())
    ) {
        age--;
    }

    return age;
}
