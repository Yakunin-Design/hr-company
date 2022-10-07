import React from 'react';
import { Link } from 'react-router-dom';
import Compressor from 'compressorjs';

import Header from 'components/Header';
import Footer from 'components/Footer';

import SelectUserType from './SelectUserType';

import WorkerStep1 from './WorkerStep1';
import WorkerStep2 from './WorkerStep2';

import EmployerStep1 from './EmployerStep1';
import EmployerStep2 from './EmployerStep2';

import ConfirmPhone from './ConfirmPhone';

import {
    worker_validation_step1,
    worker_validation_step2,
    employer_validation_step1,
    employer_validation_step2,
} from 'lib/validations';

import back_arrow_icon from 'assets/svg/back-arrow.svg';
import checked_icon from 'assets/svg/check.svg';

function RegisterPage() {
    if (localStorage.getItem('jwt')) {
        window.location.replace('/profile');
    }

    const [form_errors, set_form_errors] = React.useState([]);

    const [step, set_step] = React.useState({
        type: '',
        step: 0,
    });

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
        inn: '',
    });

    const [accept_tou, set_accept_tou] = React.useState(false);

    function next_step() {
        // validation
        let err = [];

        console.log(form_data);

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

        set_form_errors(err);

        if (err.length != 0) {
            return;
        }

        // Next step
        set_step(prev_step => {
            return {
                ...prev_step,
                step: prev_step.step + 1,
            };
        });

        window.scrollTo({ top: 80 });
    }

    function prev_step() {
        set_form_errors([]);

        set_step(prev_step => {
            return {
                ...prev_step,
                step: prev_step.step - 1,
            };
        });
    }

    function handle_change(event) {

        const { name, value, files } = event.target;

        if (name === 'logo') {
            const reader = new FileReader()

            reader.addEventListener("load", function () {
                if (this.result) {

                    set_form_data(prev_emp_data => {
                        return {
                            ...prev_emp_data,
                            [name]: this.result
                        }
                    })
                }
            })

            const file = files[0];
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    reader.readAsDataURL(result)
                }
            })
        } else {
            set_form_data(prev_form_data => {
                return {
                    ...prev_form_data,
                    [name]: value,
                };
            });
        }
    }

    let registration_step;

    if (step.step === 0) {
        registration_step = (
            <SelectUserType set_step={set_step} accept_tou={accept_tou} />
        );
    } else if (step.step === 3) {
        registration_step = <ConfirmPhone data={set_data(form_data)} />;
    } else if (step.type === 'worker') {
        step.step === 1
            ? (registration_step = (
                  <WorkerStep1
                      errors={form_errors}
                      form_data={form_data}
                      on_change={handle_change}
                  />
              ))
            : (registration_step = (
                  <WorkerStep2
                      form_data={form_data}
                      errors={form_errors}
                      on_change={handle_change}
                  />
              ));
    } else if (step.type === 'employer') {
        step.step === 1
            ? (registration_step = (
                  <EmployerStep1
                      form_data={form_data}
                      errors={form_errors}
                      on_change={handle_change}
                  />
              ))
            : (registration_step = (
                  <EmployerStep2
                      form_data={form_data}
                      errors={form_errors}
                      on_change={handle_change}
                  />
              ));
    }

    function set_data() {
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

    console.log(accept_tou);

    return (
        <>
            <Header />
            <div className="card-container">
                {step.step != 0 && (
                    <button className="--floating-btn" onClick={prev_step}>
                        <img src={back_arrow_icon} alt="back-btn" />
                    </button>
                )}
                <div className="card">
                    {registration_step}

                    {(step.step === 1 || step.step === 2) && (
                        <button
                            className="card__button --primary-btn"
                            onClick={next_step}
                        >
                            Далее
                        </button>
                    )}

                    {step.step === 0 && (
                        <div className="card__terms-of-use help__register --v2 --mt1 --row">
                            <input
                                className="--hiden"
                                id="tou"
                                type="checkbox"
                                name="tou"
                                onChange={() => {
                                    set_accept_tou(prev => !prev);
                                }}
                                checked={accept_tou}
                            />
                            <label htmlFor="tou">
                                <div className="tou__checkbox">
                                    {accept_tou && <img src={checked_icon} />}
                                </div>
                            </label>

                            <div>
                                Я прочитал и принимаю
                                <Link to={'/terms-of-use'}>
                                    <span className="--v2">
                                        {' '}
                                        пользовательское соглашение
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {step.step !== 3 && (
                        <>
                            <div className="card__registration">
                                <Link to={'/login'}>
                                    <div className="card__help help__register --v2 --cd">
                                        {' '}
                                        Уже есть аккаунт?{' '}
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RegisterPage;
