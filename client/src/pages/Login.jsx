import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Header from '../components/Header'
import Footer from '../components/Footer'

function LoginPage() {
    if (localStorage.getItem('jwt')) {
		window.location.replace('/profile')
	}

    const [form_data, set_form_data] = React.useState({
        login: '',
        password: ''
    })

    const [errors, set_errors] = React.useState()

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

        axios.post('http://localhost:6969/login', form_data)
            .then(res => {

                if (!res.data) {
                    return console.log('invalid data')
                }

                console.log(res)
                localStorage.setItem('jwt', res.data)

                window.location.replace("/profile")
            }).catch(err => {
                console.log(err);
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
                        />
                    </div>

                    <div className="card__password">
                        <h3 className="card__label --ld">Пароль</h3>
                        <input 
                            className="card__input" 
                            type="password"
                            name = "password"
                            onChange={event => handle_change(event)}
                        />
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