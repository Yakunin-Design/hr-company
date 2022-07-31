import React from 'react';
import Header from '../../components/Header';

import Footer from '../../components/Footer';
import QaAccordion from '../../components/QaAccordion';

import { Link } from 'react-router-dom';

import styles from './Contact.module.css';

export default function ContactPage() {

    const [form_data, set_form_data] = React.useState({
        email: '',
        message: ''
    });

    function handle_change(event) {
        const { name, value } = event.target

        set_form_data(prev_form_data => {
            return {
                ...prev_form_data,
                [name]: value
            }
        })
    }

    return (
        <>
            <Header />
            <div className="--page-container">
                <main className={styles.main}>
                    <div className={styles.clmn}>
                        <div className="card">
                            <h2>Обратная свзязь</h2>
                            <p className="--mt2">
                                Вы также можете написать нам на E-mail:{' '}
                                <span className={styles.link}>
                                    <a
                                        href="mailto:test@hr-company.com"
                                        className={styles.link}
                                    >
                                        test@hr-company.org
                                    </a>
                                </span>
                            </p>
                            <p className="--mt2">
                                Пожулуйста обратите внимание на{' '}
                                <Link to={'/faq'}>
                                    <span className={styles.link}>
                                        частые вопросы
                                    </span>
                                </Link>
                                . Ниже некоторые из них. Если не найдете ответ
                                на свой вопрос, используйте форму для обращения
                                в поддерждку.
                            </p>
                        </div>

                        <div className="card --mb0">
                            <QaAccordion
                                question={'Why ?'}
                                answer={'because'}
                            />
                            <QaAccordion
                                question={'Why ?'}
                                answer={'because'}
                            />
                            <QaAccordion
                                question={'Why ?'}
                                answer={'because'}
                            />
                            <QaAccordion
                                question={'Why ?'}
                                answer={'because'}
                            />
                        </div>
                    </div>

                    <div className={styles.clmn}>
                        <div className="card">
                            <h3 className="--ld --mb1">
                                Ваш e-mail для ответа
                            </h3>
                            <input
                                className="card__input --mb2"
                                type="text"
                                name="login"
                                onChange={event => handle_change(event)}
                            />

                            <h3 className="--ld --mb1">
                                Ваше сообщение
                            </h3>
                            <textarea
                                className="card__textarea"
                                type="text"
                                name="login"
                                onChange={event => handle_change(event)}
                            />

                            <button className="card__button --primary-btn --mt2">Отправить</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
