/**
 * Validations
*/

function checkInn(value){
	if(typeof value !== 'string' ||
		(value.length !== 10 && value.length !== 12) ||
		value.split('').some((symbol) => isNaN(Number(symbol)))
	) return false;

	if(value.length === 10){
		return Number(value[9]) === (value.split('').slice(0, -1)
			.reduce(
				(summ, symbol, index) =>
					[2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
				0)
			% 11) % 10;
		
	}else if(value.length === 12){
		let checkSumOne = (value.split('').slice(0, -2)
			.reduce(
				(summ, symbol, index) =>
					[7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
				0)
			% 11 ) % 10;
		
		let checkSumTwo = (value.split('').slice(0, -1)
				.reduce(
					(summ, symbol, index) =>
						[3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
					0)
			% 11 ) % 10;
		
		return (checkSumOne === Number(value[10]) && checkSumTwo === Number(value[11]));
	}
}

function check_full_name(name) {
    const nameArray = name.trim().split(' ');

    if (nameArray.length < 2) {
        return false
    }
    nameArray.forEach(element => {
        if (element.length < 2) {
            return false;
        }
    });
    return true
}

function check_day(day) {
    if (day < 1 || day > 31) {
        return false
    }
    return true
}

function check_month(month) {
    return (month === '00' || month === '') ? false : true;
}

function check_year(year) {
    const current_year = new Date().getFullYear() - 10;
    console.log(current_year);
    if (year < 1900 || year > current_year) {
        return false;
    }
    return true
}

function check_phone(phone) {
    const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!regex.test(phone)) {
        return false
    }
    return true
}

function check_email(email) {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!regex.test(email)) {
        return false
    }
    return true
}

function worker_validation_step1(form_data) {
    let errors = [];

    !check_full_name(form_data.full_name) && errors.push('full_name');

    if (form_data.specialty.length < 5 ) errors.push('specialty');

    !check_month(form_data.month) && errors.push('month');

    if (form_data.citizenship === '' ) errors.push('citizenship');

    !check_day(form_data.day) && errors.push('day');

    !check_year(form_data.year) && errors.push('year');
    
    return errors
}

function worker_validation_step2(form_data) {

    let errors = [];
    
    !check_phone(form_data.phone) && errors.push('phone');

    !check_email(form_data.email) && errors.push('email');

    if (form_data.password.length < 8 ) errors.push('password');

    if (form_data.password_confirmation != form_data.password) {
        errors.push('password_confirmation')
    }

    return errors
}

function employer_validation_step1(form_data) {
    let errors = []

    if (form_data.company < 5 ) errors.push('company');
    if (!checkInn(form_data.inn)) errors.push('inn');
    return errors
}

function employer_validation_step2(form_data) {
    let errors = [];
    let regex

    !check_full_name(form_data.full_name) && errors.push('full_name');
    
    !check_phone(form_data.phone) && errors.push('phone');

    !check_email(form_data.email) && errors.push('email');

    if (form_data.password.length < 8 ) errors.push('password');

    if (form_data.password_confirmation != form_data.password) {
        errors.push('password_confirmation')
    }

    return errors
}

export { worker_validation_step1, 
         worker_validation_step2,
         employer_validation_step1,
         employer_validation_step2,
         check_day,
         check_month,
         check_year,
         check_full_name,
         check_phone,
         check_email
        }