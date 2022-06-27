/**
 * Validations
*/

function worker_validation_step1(form_data) {
    let errors = [];

    const name = form_data.full_name.trim().split(' ');
    if (name.length < 2) {
        errors.push('full_name');
    }
    name.forEach(element => {
        if (element.length < 2) {
            errors.push('full_name');
        }
    });

    if (form_data.specialty.length < 5 ) errors.push('specialty');

    if (form_data.month === '00' ) errors.push('month');

    if (form_data.citizenship === '' ) errors.push('citizenship');

    if (form_data.day < 1 || form_data.day > 31) {
        errors.push('day');
    }

    const current_year = new Date().getFullYear() - 10;

    if (form_data.year < 1900 || form_data.year > current_year) {
        errors.push('year');
    }
    
    return errors
}

function worker_validation_step2(form_data) {

    let errors = [];
    let regex
    
    regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!regex.test(form_data.phone)) {
        errors.push('phone')
    }

    regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!regex.test(form_data.email)) {
        errors.push('email')
    }

    if (form_data.password.length < 8 ) errors.push('password');

    if (form_data.password_confirmation != form_data.password) {
        errors.push('password_confirmation')
    }

    return errors
}

function employer_validation_step1() {
    return []
}

function employer_validation_step2() {
    return []
}

export {worker_validation_step1, worker_validation_step2, employer_validation_step1, employer_validation_step2}