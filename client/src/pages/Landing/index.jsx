import React from 'react';
import Header from '../../components/Header';

import { Link } from 'react-router-dom';

import styles from './landing.module.css';
import Footer from '../../components/Footer';

function LandingPage() {
    if (localStorage.getItem('jwt')) {
        window.location.replace('/profile');
    }

    return (
        <>
            <Header />
            <div className="--page-content">
                <div className={"--page-container " + styles.landing_container}>
                    <h2 className="--mt4">
                        Добро пожаловать на платформу hr company!
                    </h2>
                    <p className="--mt2">
                        Тут вы можете найти актуальные вакансии или компетентных
                        работников, для этого предлагаем вам зарегестрироваться.
                        Приятного пользования!
                    </p>
                    <Link to={'/register'}>
                        <button
                            className={
                                '--primary-btn --mt2 ' + styles.landing_btn
                            }
                        >
                            Регистрация
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LandingPage;
