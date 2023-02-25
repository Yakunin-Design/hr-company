import Result from './Result';
import IWorker from '../interfaces/IWorker'
import IEmployer from '../interfaces/IEmployer'
import db from '../lib/idb'

type common_validation_data = {
    email: string,
    phone: string,
    password: string,
    full_name: string
}

type cardentials = {
    phone: string,
    email: string
}

function common_checks(data: common_validation_data): Result<boolean> {
    let checker = email(data.email)
    if (!checker.Ok) return { Ok: null, Err: checker.Err };
    
    checker = phone(data.phone)
    if (!checker.Ok) return { Ok: null, Err: checker.Err };

    checker = password(data.password)
    if (!checker.Ok) return { Ok: null, Err: checker.Err };

    checker = full_name(data.full_name)
    if (!checker.Ok) return { Ok: null, Err: checker.Err };

    return { Ok: true};
}

async function employer_checks(payload: IEmployer): Promise<Result<IEmployer>> {
    const common_data: common_validation_data = {
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        full_name: payload.full_name
    };

    const cardentials: cardentials = {
        phone: payload.phone,
        email: payload.email
    }

    let checker = await exists('employers', cardentials);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    checker = await exists('workers', cardentials);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    checker = common_checks(common_data);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    checker = company(payload.company);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    checker = inn(payload.inn);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    return { Ok: payload };
}

async function worker_checks(payload: IWorker): Promise<Result<IWorker>> {

    const common_data: common_validation_data = {
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        full_name: payload.full_name
    }

    const cardentials: cardentials = {
        phone: payload.phone,
        email: payload.email
    }

    let checker = await exists('workers', cardentials);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    checker = await exists('employers', cardentials);
    if (!checker.Ok) return {Ok: null, Err: checker.Err};

    checker = common_checks(common_data);
    if (!checker.Ok) return { Ok: null, Err: checker.Err };
      
    checker = birthday(payload.birthday);
    if (!checker.Ok) return { Ok: null, Err: checker.Err };

    checker = citizenship(payload.citizenship);
    if (!checker.Ok) return { Ok: null, Err: checker.Err };

    checker = specialty(payload.specialty);
    if (!checker.Ok) return { Ok: null, Err: checker.Err };

    return { Ok: payload };
}

function email(email: string): Result<boolean> {
    if (!email) {
        return { Ok: null, Err: new Error('Email empty') };
    }
    
    // check email
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(email)
        ? { Ok: true }
        : { Ok: false, Err: new Error('email check failed') };

}

function phone(phone: string): Result<boolean> {
    if (!phone) {
        return { Ok: null, Err: new Error('Phone empty') };
    }
    
    // check phone
    const regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    
    return regex.test(phone)
        ? { Ok: true }
        : { Ok: false, Err: new Error('phone check failed') };
        
}

function password(password: string): Result<boolean> {
    if (!password) {
        return { Ok: null, Err: new Error('Password empty') };
    }

    if (password.length < 4) {
        return { Ok: null, Err: new Error("Your password is too short")};
    }
    return { Ok: true };
}

function full_name(name: string): Result<boolean> {

    if (!name) {
        return { Ok: null, Err: new Error('Name empty') };
    }
    
    const full_name = name.trim().split(' ');

    if (full_name.length < 2 || full_name.length > 3) {
        return { Ok: null, Err: new Error('Name check falied') };
    }

    return { Ok: true };
}

function inn(inn: string): Result<boolean> {
    if (!inn) {
        return { Ok: null, Err: new Error('inn empty') };
    }

    // check inn
    if (inn.length != 10 && inn.length != 12) {
        return { Ok: false, Err: new Error('inn check failed') };
    }

    return { Ok: true };
}

function company(company: string): Result<boolean> {
    if (!company) {
        return { Ok: null, Err: new Error('Company empty') };
    }
    
    if (company.length < 2) {
        return { Ok: false, Err: new Error('company check failed') };
    }

    return { Ok: true };
}

function birthday(birthday: string): Result<boolean> {
    if (!birthday) {
        return { Ok: null, Err: new Error('Birthday empty') };
    }
    // day.month.year (00.00.0000)
    const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    return regex.test(birthday)
        ? { Ok: true }
        : { Ok: false, Err: new Error('birthday check failed') };
}

function citizenship(citizenship: string): Result<boolean> {
    if (!citizenship) {
        return { Ok: null, Err: new Error('Citizenship empty') };
    }

    if (citizenship != 'ru' && citizenship != 'bu/ua' && citizenship != 'sng' && citizenship != 'other') {
        return { Ok: false, Err: new Error('citizenship check failed') };
    }

    return { Ok: true };
}

function specialty(specialty: string): Result<boolean> {
    if(!specialty || specialty.length === 0){
        return { Ok: null, Err: new Error('Specialty empty') };
    }

    //need to edit!
    if (specialty[0].length < 5) {
        return { Ok: false, Err: new Error('specialty check failed') };
    }

    return { Ok: true };
}
    

    // return { Ok: result[0], Err: null };


async function exists(collection_name: string, cardentials: cardentials): Promise<Result<boolean>> {
    const result = await db.find_all({$or: [{phone: cardentials.phone}, {email: cardentials.email}]}, collection_name);

    if (result.Ok === null) 
        return { Ok: null, Err: new Error('DB error') };

    if (result.Ok.length >= 1)
        return { Ok: null, Err: new Error('User already exists!') };

    if (result.Ok?.length === 0) {
        return { Ok: true };
    }

    return { Ok: null, Err: new Error('DB error') };
}

export default {
    email, phone, password, full_name,
    company, inn,
    birthday, citizenship,
    employer_checks, worker_checks
}