import React from 'react';
import Header from '../../components/Header';

import Footer from '../../components/Footer';
import QaAccordion from '../../components/QaAccordion';

import { Link } from 'react-router-dom';

import styles from './faq.module.css';

export default function FaqPage() {
    return (
        <>
            <Header />
            <div className="--page-container">
                <main className={styles.main}>

                    <div className={styles.clmn}>
                        <div className="card">
                            <h2>Частые вопросы</h2>
                            <p className="--mt2">
                                Не нашли ответа на свой вопрос ? Тогда задайте нам вопрос на <Link to={'/contact'}><span className={styles.link}>странице обратной связи</span></Link>.
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
                            <QaAccordion
                                question={'Lets do some really long rolem like text to test for long questions look like'}
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
                </main>
            </div>
            <Footer />
        </>
    );
}
