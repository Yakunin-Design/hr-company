import React from 'react'; import Header from '../components/Header'
import { Link } from 'react-router-dom'

import SelectUserType from './register/SelectUserType'

import WorkerStep1 from './register/WorkerStep1'
import WorkerStep2 from './register/WorkerStep2'

import EmployerStep1 from './register/EmployerStep1'
import EmployerStep2 from './register/EmployerStep2'

import ConfirmPhone from './register/ConfirmPhone'

import { worker_validation_step1, worker_validation_step2, employer_validation_step1, employer_validation_step2 } from '../functions/validations'

import back_arrow_icon from '../img/back-arrow.svg'

function RegisterPage() {

    const [form_errors, set_form_errors] = React.useState([])
    
    const [step, set_step] = React.useState({
        type: '',
        step: 0
    })

    const [form_data, set_form_data] = React.useState({
        full_name: '',
        day: '',
        month: '00',
        year: '',
        citizenship: '',
        specialty: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        company: '',
        inn: ''
    })
    
    function next_step() {
        // validation
        let err = []

        if (step.step === 1 && step.type === 'worker') {
            err = worker_validation_step1(form_data);
        }

        if (step.step === 2 && step.type === 'worker') {
            err = worker_validation_step2(form_data);
        }
        
        if (step.step === 1 && step.type === 'employer') {
            err = employer_validation_step1(form_data);
        }

        if (step.step === 2 && step.type === 'employer') {
            err = employer_validation_step2(form_data);
        }

        set_form_errors(err)

        if (err.length != 0) {
            return;
        }

        // Next step
        set_step(prev_step => {
            return {
                ...prev_step,
                step: prev_step.step + 1,
            }
        })
    }

    function prev_step() {
        set_form_errors([])

        set_step(prev_step => {
            return {
                ...prev_step,
                step: prev_step.step - 1,
            }
        })
    }

    function handle_change(event) {
        const { name, value } = event.target

        console.log(form_data)

        set_form_data(prev_form_data => { 
            return {
                ...prev_form_data,
                [name]: value
            }
        })
    }

    let registration_step;

    if (step.step === 0) {
        registration_step = <SelectUserType set_step={set_step} />

    } else if(step.step === 3){
        registration_step = <ConfirmPhone data={set_data(form_data)}/>

    } else if (step.type === 'worker') {
        step.step === 1
            ? registration_step = <WorkerStep1
                errors={form_errors}
                form_data={form_data}
                on_change={handle_change}
            />
            : registration_step = <WorkerStep2
                form_data={form_data}
                errors={form_errors}
                on_change={handle_change}
            />

    } else if (step.type === 'employer') {
        step.step === 1
            ? registration_step = <EmployerStep1
                form_data={form_data}
                errors={form_errors}
                on_change={handle_change}
            />
            : registration_step = <EmployerStep2
                form_data={form_data}
                errors={form_errors}
                on_change={handle_change}
            />
    }

    function set_data() {
        let birthday = form_data.day + '.' + form_data.month + '.' + form_data.year
        const data = {
            user_type: step.type,
            payload: {
                ...form_data,
                birthday,
                specialty: [form_data.specialty]
            }
        }

        delete data.payload.day
        delete data.payload.month
        delete data.payload.year
        delete data.payload.password_confirmation

        return data
    }

	return (
		<>
			<Header/>
            <div className="card-container">
                {(step.step != 0) && <button className="--floating-btn" onClick={prev_step}><img src={back_arrow_icon} alt="back-btn" /></button>}   
                <div className="card">

                    { registration_step }

                    {(step.step === 1 || step.step === 2) && <button className="card__button --primary-btn" onClick={next_step}>Далее</button>}

                    {
                        (step.step !== 3) ?
                            <>
                                <div className="card__registration">
                                    <Link to={'/login'}>
                                        <div className="card__help help__register --v2 --cd"> Уже есть аккаунт? </div>
                                    </Link>
                                </div>
                            </>

                            : <button className="card__button --primary-btn" onClick={set_data}>Завершить регистарцию</button>
                    }

                </div>
            </div>
		</>
	)
}

export default RegisterPage;