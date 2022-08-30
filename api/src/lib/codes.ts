import Result from "./Result";
import axios from "axios";

// Sends sms with sms.ru's API
// https://https://smsaero.ru/
function send_sms(phone: string, msg: string): Result<boolean> {


    let send_phone = phone.split('');
    send_phone = send_phone.filter(val => val != " ")
    send_phone = send_phone.filter(val => val != "+")
    send_phone = send_phone.filter(val => val != "(")
    send_phone = send_phone.filter(val => val != ")")

    if (send_phone[0] === '+') send_phone.shift();
    else if (send_phone[0] === '8') send_phone[0] = '7';

    console.log(send_phone.join(''));

    const api_id = "2AAPXYuL3YlErxWOZGFlBVk2bhlR";
    const email =  "andrey.kazako75@gmail.com";
    const url = `https://${email}:${api_id}@gate.smsaero.ru/v2/sms/send?number=${send_phone.join('')}&text=${msg}&sign=SMS Aero`;
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