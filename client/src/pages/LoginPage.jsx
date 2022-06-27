import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function LoginPage() {

    return (
        <>
            <Header hide_button={ true }/>
            <div className="card-container">
                <div className="card">
                    <h2 className="card__title --ld">Вход в аккаунт</h2>

                    <div className="card__login">
                        <h3 className="card__label --ld">Логин (email или телефон)</h3>
                        <input className="card__input" type="text"/>
                    </div>

                    <div className="card__password">
                        <h3 className="card__label --ld">Пароль</h3>
                        <input className="card__input" type="password"/>
                    </div>

                    <div className="card__prompt">
                        <a href="#">
                            <div className="card__help --v2 --ld"> Забыли пароль? </div>
                        </a>
                    </div>
                    
                    <button className="card__button --primary-btn">Войти</button>
                    <div className="card__registration">
                        <Link to={'/register'}>
                            <div className="card__help help__register --v2 --cd"> Или зарегистрируйтесь</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage