import React from 'react'
import LkNav from '../components/LkNav'
import Footer from '../components/Footer'
import '../styles/utils/lk.css'

import eye from '../img/eye.svg'
import drop_document from '../img/drop_document.svg'
import floating_plus from '../img/floating_plus.svg'
import ProgressArrow from '../img/progress_arrow'
import time_span from '../img/time_span.svg'

// import exp_data from '../test/data/experiences'
import Experience from '../components/Experience'

function WorkerProfile(props) {
    const [unsaved_changes, set_unsaved_changes] = React.useState(false)

    const [user_data, set_user_data] = React.useState({
        ...props.user.user_data,
        day: props.user.user_data.birthday.slice(0,2),
        month: props.user.user_data.birthday.slice(3,5),
        year: props.user.user_data.birthday.slice(6),
        documents: [],
        status: 'ready',
        experience: []
    })

    const [add_experience, set_add_experience] = React.useState(false)

    function toggle_add_experience() {
        set_add_experience(prev => !prev)
        set_unsaved_changes(true)
    }

    function log_out() {
        const confirm_log_out = window.confirm('Вы уверены что хотите выйти из аккаунта ?')
        if (confirm_log_out) {
            localStorage.removeItem('jwt')
            window.location.replace('/login')
        }
    }

    function save_data() {
        // validation

        toggle_add_experience()
        set_unsaved_changes(false)

        // send data to api
        console.log(user_data)
    }

    function handle_change(event) {
        const {name, value, type, checked} = event.target

        set_unsaved_changes(true)

        set_user_data(prev_user_data => {
            return {
                ...prev_user_data,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    const experiences =
            user_data.experience.map(exp => {
        
            return (
                <Experience data={exp} />
            )
    })


    return (
        <div className="lk">
            <LkNav page='profile' user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">

                    {unsaved_changes && <div className="--primary-btn --save-btn" onClick={save_data}>Сохранить</div>}

                    {/* 
                        ------------ PROGRESS BAR ------------
                    */}
        
                    <section className="lk__section lk__progress-bar">
                        <div className="progress">
                            <div className="progress__state --filled-state">
                                <ProgressArrow />
                            </div>
                            <div className="progress-bar">
                                <div className="bar"></div>
                                <div className="bar --filled_bar"></div>
                            </div>
                            <div className="progress__state">
                                <ProgressArrow />
                            </div>
                            <div className="progress-bar">
                                <div className="bar"></div>
                                {/* <div className="bar --filled_bar"></div> */}
                            </div>
                            <div className="progress__state">
                                <ProgressArrow />
                            </div>
                        </div>
                        <div className="progress__labels">
                            <h4 className='progress__label --filled-label'>Данные</h4>
                            <h4 className='progress__label'>Работа</h4>
                            <h4 className='progress__label'>Резюме</h4>
                        </div>
                    </section>

                    {/* 
                        ------------ PERSONAL DATA ------------
                    */}

                    <h2 className="lk__section-title">Персональные данные</h2>
                    <div className="lk__personal_data personal_data">
                        <section className="lk__section lk__basic-info">

                            <div className="personal_data__avatar-block">
                                <div className="--avatar"></div>
                            </div>

                            <h3 className="--mt2">ФИО</h3>
                            <input
                                className="card__input --mt1"
                                type="text"
                                name="full_name"
                                value={user_data.full_name}
                                placeholder="Фамилия Имя Отчество"
                                onChange={event => handle_change(event)}
                            />

                            <div className="card__birthday">
                                <h3 className="card__label ld">Дата рождения</h3>
                                <div className="birthday">
                                    <input
                                        className="card__input --day"
                                        type="tel"
                                        maxLength="2"
                                        name="day"
                                        value={user_data.day}
                                        placeholder="00"
                                        onChange={event => handle_change(event)}
                                    />

                                    <select className="card__input --month"
                                        id="month"
                                        name="month"
                                        value={user_data.month}
                                        onChange={event => handle_change(event)}
                                    >
                                        <option value="00">Месяц</option>
                                        <option value="01">Января</option>
                                        <option value="02">Февраля</option>
                                        <option value="03">Марта</option>
                                        <option value="04">Апреля</option>
                                        <option value="05">Мая</option>
                                        <option value="06">Июня</option>
                                        <option value="07">Июля</option>
                                        <option value="08">Августа</option>
                                        <option value="09">Сентября</option>
                                        <option value="10">Октября</option>
                                        <option value="11">Ноября</option>
                                        <option value="12">Декабря</option>
                                    </select>

                                    <input
                                        className="card__input --year"
                                        type="tel"
                                        maxLength="4"
                                        placeholder="0000"
                                        name="year"
                                        value={user_data.year}
                                        onChange={event => handle_change(event)}
                                    />
                                </div>	
                            </div>

                            <div className="card__citizenships">
                                <h3 className="card__label --ld">Гражданство</h3>
                                <div className="citizenships --lk-citizenships">
                                    <input 
                                        className="--hiden"
                                        id="ru"
                                        type="radio"
                                        name="citizenship"
                                        value="ru"
                                        onChange={event => handle_change(event)}
                                        checked={user_data.citizenship === 'ru'}
                                    />
                                    <label className="--radio-label --lk-radio --cd" htmlFor="ru">🇷🇺</label>

                                    <input 
                                        className="--hiden"
                                        id="bu/ua"
                                        type="radio"
                                        name="citizenship"
                                        value="bu/ua"
                                        onChange={event => handle_change(event)}
                                        checked={user_data.citizenship === 'bu/ua'}
                                    />
                                    <label className="--radio-label --lk-radio --cd" htmlFor="bu/ua">🇧🇾/🇺🇦</label>

                                    <input
                                        className="--hiden"
                                        id="sng"
                                        type="radio"
                                        name="citizenship"
                                        value="sng"
                                        onChange={event => handle_change(event)}
                                        checked={user_data.citizenship === 'sng'}
                                    />
                                    <label className="--radio-label --lk-radio --cd" htmlFor="sng">СНГ</label>

                                    <input 
                                        className="--hiden"
                                        id="other"
                                        type="radio"
                                        name="citizenship"
                                        value="other"
                                        onChange={event => handle_change(event)}
                                        checked={user_data.citizenship === 'other'}
                                    />
                                    <label className="--radio-label --lk-radio --cd" htmlFor="other">Другое</label>
                                </div> 
                            </div>
                        </section>

                        {/* 
                                ------------ DOCUMENTS ------------
                        */}

                        <section className="lk__section lk__documents documents">
                            <h3 className="--mt2">Документы</h3>
                            <div className="documents__document document">
                                <div className="document__icon"></div>
                                <div className="document__info">
                                    <h4 className='--ld'>Паспорт РФ</h4>
                                    <p className='--ld --v2'>4018 *** ***</p>
                                </div>
                                <img src={eye} className='document__button' alt="" />
                            </div>
                            <div className="documents__document document">
                                <div className="document__icon"></div>
                                <div className="document__info">
                                    <h4 className='--ld'>Мед. книжка</h4>
                                    <p className='--ld --v2'>Есть</p>
                                </div>
                                <img src={drop_document} className='document__button' alt="" />
                            </div>
                            <p className="documents__add">Добавить документ + </p>
                        </section>
                    </div>

                    {/* 
                        ------------ CONTACTS ------------
                    */}

                    <h2 className="lk__section-title">Контактные данные</h2>
                    <section className="lk__section">

                        <h3>Статус</h3>
                        <div className="lk__status">
                            <input 
                                className="--hiden"
                                id="ready"
                                type="radio"
                                name="status"
                                value='ready'
                                checked={user_data.status === 'ready'}
                                onChange={event => handle_change(event)}
                            />
                            <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="ready">Готов</label>

                            <input 
                                className="--hiden"
                                id="not_ready"
                                type="radio"
                                name="status"
                                value='not_ready'
                                checked={user_data.status === 'not_ready'}
                                onChange={event => handle_change(event)}
                            />
                            <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="not_ready">Не готов</label>
                        </div> 

                        <div className="lk__contacts">
                            <div className="lk__contact --email">
                                <h3 className="--mt2">Email</h3>
                                <input
                                    className="card__input --mt1"
                                    type="text"
                                    name="email"
                                    placeholder="email@example.com"
                                    value={user_data.email}
                                    onChange={event => handle_change(event)}
                                />
                            </div>
                            <div className="lk__contact --phone">
                                <h3 className="--mt2">Телефон</h3>
                                <input
                                    className="card__input --mt1"
                                    type="text"
                                    name="phone"
                                    placeholder="+7 (000) 000 00-00"
                                    value={user_data.phone}
                                    onChange={event => handle_change(event)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* 
                        ------------ EXPERIENCE ------------
                    */}

                    <h2 className="lk__section-title">Опыт работы</h2>
                    <div className="experience__container">
                        {
                            user_data.experience.length === 0 && !add_experience
                            ? 
                            <section className="lk__section lk__experience experience">
                                <h3>Вы не добавили опыт работы, для добавления нажмите на кнопку ниже.</h3>
                            </section>
                            :
                            experiences
                        }
                        {
                            add_experience
                            ?
                            <section className="lk__section lk__experience experience">
                                <div className="experience__add-base-info">
                                    <div className="lk__contact --role">
                                        <h3>Должность</h3>
                                        <input
                                            className="card__input --mt1"
                                            type="text"
                                            name="role"
                                            placeholder="Повар горячего цеха"
                                            value=""
                                            onChange={event => handle_change(event)}
                                        />
                                    </div>
                                    <div className="lk__contact --company">
                                        <h3>Название заведения</h3>
                                        <input
                                            className="card__input --mt1"
                                            type="text"
                                            name="role"
                                            value=""
                                            onChange={event => handle_change(event)}
                                        />
                                    </div>
                                </div>

                                <h3 className="--mt2">Какими были ваши обязательства</h3>
                                <textarea
                                    className="card__textarea --mt1"
                                    type="text"
                                    name="role"
                                    placeholder="Опишите ваши обязанности, объем работы и задачи"
                                    value=""
                                    onChange={event => handle_change(event)}
                                />

                                <div className="experience__add-date add-date">
                                    <div className="add-date__block">
                                            <h3 className="card__label ld">Начало работы</h3>
                                            <div className="add-date__inputs">

                                                <select className="card__input --month --exp-month"
                                                    id="exp-month"
                                                    name="exp-start-month"
                                                    value="00"
                                                    onChange={event => handle_change(event)}
                                                >
                                                    <option value="00">Месяц</option>
                                                    <option value="01">Января</option>
                                                    <option value="02">Февраля</option>
                                                    <option value="03">Марта</option>
                                                    <option value="04">Апреля</option>
                                                    <option value="05">Мая</option>
                                                    <option value="06">Июня</option>
                                                    <option value="07">Июля</option>
                                                    <option value="08">Августа</option>
                                                    <option value="09">Сентября</option>
                                                    <option value="10">Октября</option>
                                                    <option value="11">Ноября</option>
                                                    <option value="12">Декабря</option>
                                                </select>

                                                <input
                                                    className="card__input --year --exp-year"
                                                    type="tel"
                                                    maxLength="4"
                                                    placeholder="0000"
                                                    name="exp-start-year"
                                                    onChange={event => handle_change(event)}
                                                />
                                        </div>
                                    </div>
                                    <img src={time_span} alt="" srcset="" className='--exp-time-span'/>
                                    <div className="add-date__block">
                                            <h3 className="card__label ld">Окончание работы</h3>
                                            <div className="add-date__inputs">

                                                <select className="card__input --month --exp-month"
                                                    id="exp-month"
                                                    name="exp-end-month"
                                                    value="00"
                                                    onChange={event => handle_change(event)}
                                                >
                                                    <option value="00">Месяц</option>
                                                    <option value="01">Января</option>
                                                    <option value="02">Февраля</option>
                                                    <option value="03">Марта</option>
                                                    <option value="04">Апреля</option>
                                                    <option value="05">Мая</option>
                                                    <option value="06">Июня</option>
                                                    <option value="07">Июля</option>
                                                    <option value="08">Августа</option>
                                                    <option value="09">Сентября</option>
                                                    <option value="10">Октября</option>
                                                    <option value="11">Ноября</option>
                                                    <option value="12">Декабря</option>
                                                </select>

                                                <input
                                                    className="card__input --year --exp-year"
                                                    type="tel"
                                                    maxLength="4"
                                                    placeholder="0000"
                                                    name="exp-end-year"
                                                    onChange={event => handle_change(event)}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            :
                            <img src={floating_plus} className='experience__add' alt="" onClick={toggle_add_experience}/>
                        }

                    </div>
                    <h2 className="lk__section-title">Управление аккаунтом</h2>
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