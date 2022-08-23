import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { check_phone,check_email } from '../../../lib/validations'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

function LoginPage() {

    const error_style = {
        border: '2px solid red'
    } 

    if (localStorage.getItem('jwt')) {
		window.location.replace('/profile')
	}

    const [form_data, set_form_data] = React.useState({
        login: '',
        password: ''
    })

    const [errors, set_errors] = React.useState([])

    function handle_change(event) {
        const { name, value } = event.target

        set_form_data(prev_form_data => {
            return {
                ...prev_form_data,
                [name]: value
            }
        })
    }

    function sign_in() {
        if (!check_email(form_data.login) && !check_phone(form_data.login)) {
            set_errors('login')
            return console.log('invalid login')
        }

        if (form_data.password.length < 8) {
            set_errors('uncorrected_password')
            return console.log('invalid password')
        }

        set_errors([])

        axios.post('http://localhost:6969/login', form_data)
            .then(res => {

                if (!res.data) {
                    console.log('smth wrong')
                }

                localStorage.setItem('jwt', res.data)

                window.location.replace("/profile")

            }).catch(err => {
                console.log(err);

                if (err.response.data === 'Account with passed cardentials was not found') {
                    set_errors('not_found')
                }

                if (err.response.data === 'Wrong password') {
                    set_errors('wrong_password')
                }

            })
    }

    return (
        <>
            <Header hide_button={ true }/>
            <div className="card-container">
                <div className="card">
                    <h2 className="card__title --ld">Вход в аккаунт</h2>

                    <div className="card__login">
                        <h3 className="card__label --ld">Логин (email или телефон)</h3>
                        <input
                            className="card__input"
                            type="text"
                            name = "login"
                            onChange={event => handle_change(event)}
                            style={errors.includes('login') ? error_style : {}}
                        />
                        {errors.includes('not_found') && <span className="card__wrong">Аккаунт не найден</span>}
                    </div>

                    <div className="card__password">
                        <h3 className="card__label --ld">Пароль</h3>
                        <input 
                            className="card__input" 
                            type="password"
                            name = "password"
                            onChange={event => handle_change(event)}
                            style={errors.includes('uncorrected_password') ? error_style : {}}
                        />
                        {errors.includes('wrong_password') && <span className="card__wrong">Неверный пароль</span>}
                    </div>

                    <div className="card__prompt">
                        <a href="#">
                            <div className="card__help --v2 --ld"> Забыли пароль? </div>
                        </a>
                    </div>
                    
                    <button className="card__button --primary-btn" onClick={sign_in}>Войти</button>
                    <div className="card__registration">
                        <Link to={'/register'}>
                            <div className="card__help help__register --v2 --cd"> Или зарегистрируйтесь</div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LoginPage