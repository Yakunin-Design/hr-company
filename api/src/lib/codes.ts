import Result from "./Result";
import axios from "axios";

// Sends sms with sms.ru's API
// https://sms.ru/?panel=api
function send_sms(phone: string, msg: string): Result<boolean> {
    const api_id = "2541EBE8-025E-46C7-78F8-6C462D43258A";
    const url = `https://sms.ru/sms/send?api_id=${api_id}&to=${phone}&msg=${msg}&json=1`;

    axios.get(url).then().catch(err => {
        console.log('Error: ', err.message);
        return {Ok: false, Err: new Error('cant send sms')};
    });

    return {Ok: true};
}

function send_email(email: string, msg: string): Result<boolean> {
    const api_id = "6p3j1sfawsw173x9daajgwczuwpszz9nzfzm46ee";
    const from_name = "HR-Company";
    const from_mail = "andrey.kazako75@gmail.com";
    const subject = "HR Company Verification Code";
    const html_body = `<h1>${msg}</h1>`;

    const url = `https://api.unisender.com/ru/api/sendEmail?format=json
    &api_key=${api_id}
    &email=${email}
    &sender_name=${from_name}
    &sender_email=${from_mail}
    &subject=${subject}
    &body=${html_body}
    &list_id=1`;

    axios.get(url).then().catch(err => {
        console.log('Error: ', err.message);
        return {Ok: false, Err: new Error('cant send mail')};
    });

    return {Ok: true};
}

function generate_code(): number {
    return Math.floor(1000 + Math.random() * 9000);
}

export {send_sms, send_email, generate_code}