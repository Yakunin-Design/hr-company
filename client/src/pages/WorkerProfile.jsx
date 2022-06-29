import React from 'react'
import LkNav from '../components/LkNav'
import Footer from '../components/Footer'
import '../styles/utils/lk.css'

function WorkerProfile(props) {

    function log_out() {
        localStorage.removeItem('jwt')
        window.location.replace('/login')
    }

    return (
        <div className="lk">
            <LkNav page='profile' user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">

                    <section className="lk__progress-bar">
        
                    </section>

                    <h2 className="lk__section-title">Персональные данные</h2>
                    <div className="lk__personal_data">

                        <section className="lk__section lk__basic-info">
                            <h3>ФИО</h3>
                            <p>{props.user.user_data.full_name}</p>
                            <h3 className='--mt2'>Дата рождения</h3>
                            <p>{props.user.user_data.birthday}</p>
                            <h3 className='--mt2'>Гражданство</h3>
                            <p>{props.user.user_data.citizenship}</p>
                        </section>

                        <section className="lk__section lk__documents documents">
                            <h3>Документы</h3>
                            <div className="documents__document document">
                                <div className="document__icon"></div>
                                <div className="document__info">
                                    <h4 className='--ld'>Паспорт РФ</h4>
                                    <p className='--ld --v2'>4018 *** ***</p>
                                </div>
                            </div>
                            <p className="documents__add">Добавить документ + </p>
                        </section>
                    </div>

                    <h2 className="lk__section-title">Контактные данные</h2>
                    <section className="lk__section">
                        <h3>Телефон</h3>
                        <p>{props.user.user_data.phone}</p>
                        <h3 className='--mt2'>Email</h3>
                        <p>{props.user.user_data.email}</p>
                    </section>

                    <h2 className="lk__section-title">Опасная зона</h2>
                    <section className="lk__section">
                        <button className="--secondary-btn --red-btn" onClick={log_out}>Выйти из аккаунта</button>
                    </section>
                </div>
                <Footer/>
            </main>
        </div>
    )

}

export default WorkerProfile