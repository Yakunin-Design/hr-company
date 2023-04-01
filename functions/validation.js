import subway_stations from "@/data/districts";

function checkInn(value) {
    if (
        typeof value !== "string" ||
        (value.length !== 10 && value.length !== 12) ||
        value.split("").some(symbol => isNaN(Number(symbol)))
    )
        return false;

    if (value.length === 10) {
        return (
            Number(value[9]) ===
            (value
                .split("")
                .slice(0, -1)
                .reduce(
                    (summ, symbol, index) =>
                        [2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) +
                        summ,
                    0
                ) %
                11) %
                10
        );
    } else if (value.length === 12) {
        let checkSumOne =
            (value
                .split("")
                .slice(0, -2)
                .reduce(
                    (summ, symbol, index) =>
                        [7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] *
                            Number(symbol) +
                        summ,
                    0
                ) %
                11) %
            10;

        let checkSumTwo =
            (value
                .split("")
                .slice(0, -1)
                .reduce(
                    (summ, symbol, index) =>
                        [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] *
                            Number(symbol) +
                        summ,
                    0
                ) %
                11) %
            10;

        return (
            checkSumOne === Number(value[10]) &&
            checkSumTwo === Number(value[11])
        );
    }
}

function check_full_name(name) {
    const nameArray = name.trim().split(" ");

    if (nameArray.length < 2) {
        return false;
    }
    nameArray.forEach(element => {
        if (element.length < 2) {
            return false;
        }
    });
    return true;
}

function check_day(day) {
    if (day < 1 || day > 31) {
        return false;
    }
    return true;
}

function check_month(month) {
    return month === "00" || month === "" ? false : true;
}

function check_year(year) {
    const allowed_year = new Date().getFullYear() - 10;

    if (year < 1900 || year > allowed_year) {
        return false;
    }
    return true;
}

function check_phone(phone) {
    const regex =
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
    if (!regex.test(phone)) {
        return false;
    }
    return true;
}

function check_email(email) {
    const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!regex.test(email)) {
        return false;
    }
    return true;
}

function worker_validation_step1(form_data) {
    let errors = [];

    !check_full_name(form_data.full_name) && errors.push("full_name");

    if (form_data.specialty.length < 5) errors.push("specialty");

    !check_month(form_data.month) && errors.push("month");

    if (form_data.citizenship === "") errors.push("citizenship");

    !check_day(form_data.day) && errors.push("day");

    !check_year(form_data.year) && errors.push("year");

    return errors;
}

function worker_validation_step2(form_data) {
    let errors = [];

    !check_phone(form_data.phone) && errors.push("phone");

    !check_email(form_data.email) && errors.push("email");

    if (form_data.password.length < 8) errors.push("password");

    if (form_data.password_confirmation != form_data.password) {
        errors.push("password_confirmation");
    }

    return errors;
}

function employer_validation_step1(form_data) {
    let errors = [];

    if (form_data.company.length < 5) errors.push("company");
    if (!checkInn(form_data.inn)) errors.push("inn");
    return errors;
}

function employer_validation_step2(form_data) {
    let errors = [];
    let regex;

    !check_full_name(form_data.full_name) && errors.push("full_name");

    !check_phone(form_data.phone) && errors.push("phone");

    !check_email(form_data.email) && errors.push("email");

    if (form_data.password.length < 8) errors.push("password");

    if (form_data.password_confirmation != form_data.password) {
        errors.push("password_confirmation");
    }

    return errors;
}

function job_offer_validation(job_offer_data) {
    let validation_errors = [];
    let send_data = {};

    //default
    send_data.type = "full_time";
    send_data.salary = job_offer_data.salary;
    send_data.experience = job_offer_data.experience;
    send_data.citizenship = job_offer_data.citizenship;
    send_data.sex = job_offer_data.sex;

    //required
    job_offer_data.specialty === ""
        ? validation_errors.push("specialty")
        : (send_data.specialty = job_offer_data.specialty);
    job_offer_data.address === ""
        ? validation_errors.push("address")
        : (send_data.address = job_offer_data.address);
    subway_stations.indexOf(job_offer_data.subway) === -1
        ? validation_errors.push("subway")
        : (send_data.subway = job_offer_data.subway);

    //main
    if (
        job_offer_data.working_time.start != "" &&
        job_offer_data.working_time.end === ""
    ) {
        validation_errors.push("wt-end");
    } else if (
        job_offer_data.working_time.start === "" &&
        job_offer_data.working_time.end != ""
    ) {
        validation_errors.push("wt-start");
    } else if (
        job_offer_data.working_time.start &&
        job_offer_data.working_time.end != ""
    ) {
        send_data.working_time = job_offer_data.working_time;
    }

    if (
        job_offer_data.schedule.weekdays != "" &&
        job_offer_data.schedule.weekends === ""
    ) {
        validation_errors.push("weekdays");
    } else if (
        job_offer_data.schedule.weekdays === "" &&
        job_offer_data.schedule.weekends != ""
    ) {
        validation_errors.push("weekends");
    } else if (
        job_offer_data.schedule.weekdays != "" &&
        job_offer_data.schedule.weekends != ""
    ) {
        send_data.schedule = job_offer_data.schedule;
    }

    //advanced
    if (
        !isNaN(job_offer_data.age.from) ||
        !isNaN(job_offer_data.age.to != "")
    ) {
        send_data.age = job_offer_data.age;
    } else if (
        !isNaN(job_offer_data.age.from) &&
        job_offer_data.age.from != ""
    ) {
        validation_errors.push("age-from");
    } else if (!isNaN(job_offer_data.age.to) && job_offer_data.age.to != "") {
        validation_errors.push("age-to");
    }
    if (job_offer_data.description != "")
        send_data.description = job_offer_data.description;

    return { validation_errors, send_data };
}

export {
    job_offer_validation,
    worker_validation_step1,
    worker_validation_step2,
    employer_validation_step1,
    employer_validation_step2,
    check_day,
    check_month,
    check_year,
    check_full_name,
    check_phone,
    check_email,
};
