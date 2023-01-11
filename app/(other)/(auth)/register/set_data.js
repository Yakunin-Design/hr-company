// formats input data to fit api

export default function set_data(form_data, step) {
    let data = {};

    if (step.type === 'worker') {
        let birthday =
            form_data.day + '.' + form_data.month + '.' + form_data.year;

        data = {
            user_type: step.type,
            payload: {
                ...form_data,
                birthday,
                specialty: [form_data.specialty],
            },
        };

        delete data.payload.day;
        delete data.payload.month;
        delete data.payload.year;
        delete data.payload.password_confirmation;

        delete data.payload.company;
        delete data.payload.inn;
    } else {
        data = {
            user_type: step.type,
            payload: {
                ...form_data,
            },
        };
        delete data.payload.day;
        delete data.payload.month;
        delete data.payload.month;
        delete data.payload.year;
        delete data.payload.password_confirmation;

        delete data.payload.specialty;
        delete data.payload.citizenship;
    }
    return data;
}