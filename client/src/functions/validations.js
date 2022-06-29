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

function employer_validation_step1(form_data) {
    let errors = []

    if (form_data.company < 5 ) errors.push('company');
    if (!checkInn(form_data.inn)) errors.push('inn');
    return errors
}

function employer_validation_step2(form_data) {
    let errors = [];
    let regex

    const name = form_data.full_name.trim().split(' ');
    if (name.length < 2) {
        errors.push('full_name');
    }
    name.forEach(element => {
        if (element.length < 2) {
            errors.push('full_name');
        }
    });
    
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

export { worker_validation_step1, worker_validation_step2, employer_validation_step1, employer_validation_step2 }