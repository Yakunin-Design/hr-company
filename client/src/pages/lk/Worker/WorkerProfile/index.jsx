import React from 'react'
import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'
import { check_day, check_month, check_year, check_full_name, check_phone, check_email } from '../../../../functions/validations'
import '../../../../styles/utils/lk.css'

import eye from '../../../../assets/svg/eye.svg'
import drop_document from '../../../../assets/svg/drop_document.svg'
import floating_plus from '../../../../assets/svg/floating_plus.svg'
import ProgressArrow from '../../../../assets/svg/progress_arrow'
import time_span from '../../../../assets/svg/time_span.svg'

// import exp_data from '../test/data/experiences'
import Experience from '../../../../components/Experience'
import axios from 'axios'

function WorkerProfile(props) {

    const [edit_errors, set_edit_errors] = React.useState([])
    const [edits, set_edits] = React.useState([])

    const [show_save_btn, set_show_save_btn] = React.useState(false)

    const [user_data, set_user_data] = React.useState({
        ...props.user.user_data,
        day: props.user.user_data.birthday.slice(0,2),
        month: props.user.user_data.birthday.slice(3,5),
        year: props.user.user_data.birthday.slice(6),
        documents: [],
        status: 'ready',
        experience: props.user.user_data.experience || []
    })

    const [add_experience, set_add_experience] = React.useState(false)
    const [exp_info, set_exp_info] = React.useState({})

    function toggle_add_experience() {
        set_add_experience(prev => !prev)
        add_experience && set_show_save_btn(true)
    }

    function log_out() {
        const confirm_log_out = window.confirm('Вы уверены что хотите выйти из аккаунта ?')
        if (confirm_log_out) {
            localStorage.removeItem('jwt')
            window.location.replace('/login')
        }
    }

    function add_data(data, edit) {
        data[edit] = user_data[edit]
        set_edits(prev => prev.filter(edit => edit != user_data[edit] ))
    }

    function save_data() {
        const err = []
        let data = {}

        edits.forEach(edit => {
            if (edit === 'full_name') {
                check_full_name(user_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'email') {
                check_email(user_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'phone') {
                check_phone(user_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'day') {
                check_day(user_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'month') {
                check_month(user_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'year') {
                check_year(user_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'citizenship' || edit === 'status') {
                add_data(data, edit)
            }
        })

        if (Object.keys(exp_info).length > 0) {

            let err_count = 0;

            if ( exp_info["title"] ) { 
                if (exp_info["title"].length < 5) {
                    err.push('title')
                    err_count++;
                }
            } else {
                err.push('title')
                err_count++;
            }

            if (exp_info["employer"]) {
                if ( exp_info["employer"].length < 3) {
                    err.push('employer')
                    err_count++;
                }
            }  else {
                err.push('employer')
                err_count++;
            }
                
            if (exp_info["description"]) {
                if ( exp_info["description"].length < 20) {
                    err.push('description')
                    err_count++;
                }
            } else {
                err.push('description')
                err_count++;
            }
            if (!exp_info["start_month"] || !check_month(exp_info["start_month"])) {
                err.push('start_month')
                err_count++;
            }
                
            if (!exp_info["end_month"] || !check_month(exp_info["end_month"])) {
                err.push('end_month')
                err_count++;
            }
                
            if ( !exp_info["start_year"] || exp_info["start_year"] <= (Number(props.user.user_data.birthday.slice(6))+ 16)) {
                err.push('start_year')
                err_count++;
            }   
            if (!exp_info["end_year"] || !check_year(Number(exp_info["end_year"]) - 10)) {
                err.push('end_year')
                err_count++;
            }

            if (exp_info["end_year"] < exp_info["start_year"] || (exp_info["end_year"] === exp_info["start_year"] && Number(exp_info["start_month"]) > Number(exp_info["end_month"]))) {
                
                err.push('start_year')
                err.push('end_year')
                err.push('start_month')
                err.push('end_month')

                err_count++;
            }
             
            if (err_count === 0) {

                set_user_data(prev_user_data => {
                    const new_experience = prev_user_data.experience
                    new_experience.indexOf(exp_info) === -1 && new_experience.push(exp_info)

                    return {
                        ...prev_user_data,
                        'experience' : new_experience
                    }
                })
                add_data(data, 'experience')
            }

        }

        set_edit_errors(err)

        if (err.length === 0) { 
            set_show_save_btn(false)
            set_add_experience(false)
        }

        let birthday;
        if (data.day || data.month || data.year) {

            if (data.day) {
                if (data.day.length === 1) {
                    birthday = '0'+ data.day
                } else {
                    birthday = data.day
                }
            } else {
                birthday = props.user.user_data.birthday.slice(0,2)
            }

            birthday += '.' + (data.month ? data.month : props.user.user_data.birthday.slice(3,5)) + '.' + (data.year ? data.year : props.user.user_data.birthday.slice(6))
            
            delete data.day
            delete data.month
            delete data.year

        }
        console.log(data.experience)
        const result_data = JSON.stringify({
            ...data,
            birthday,
            experience: data.experience
        })

        console.log(result_data)
        birthday && delete result_data.birthday;

        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
                'content-type': 'application/json'
            }
        }

        Object.keys(result_data).length > 0 &&
        axios.post('http://localhost:6969/profile/edit', result_data, config)
            .then(res => {
                if (!res.data) {
                    return console.log(res)
                }
                console.log(res)
            })
            .catch(e => {
                console.log(e.message)
            })

    }

    function handle_change(event) {
        const {name, value, type, checked} = event.target

        set_show_save_btn(true)

        set_edits(prev => prev.filter(edit => edit != name ))
        set_edits(prev => [...prev, name])

        set_user_data(prev_user_data => {
            return {
                ...prev_user_data,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    function add_exp_info(event) {
        const {name, value} = event.target

        set_show_save_btn(true)

        set_exp_info(prev => {
            return ({
                ...prev,
                [name]: value
            })
        })

        set_edits(prev => prev.filter(edit => edit != 'experience' ))
        set_edits(prev => [...prev, 'experience'])
        
    }

    const experiences =
        user_data.experience.map(exp => {
    
        return (
            <Experience data={exp} />
        )
    })

    const error_style = {
        border: '2px solid red'
    } 

    return (
        <div className="lk">
            <LkNav page='profile' user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">

                    {show_save_btn && <div className="--primary-btn --save-btn" onClick={save_data}>Сохранить</div>}

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
                                style={edit_errors.includes('full_name') ? error_style : {}}
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
                                        style={edit_errors.includes('day') ? error_style : {}}
                                    />

                                    <select className="card__input --month"
                                        id="month"
                                        name="month"
                                        value={user_data.month}
                                        onChange={event => handle_change(event)}
                                        style={edit_errors.includes('month') ? error_style : {}}
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
                                        style={edit_errors.includes('year') ? error_style : {}}
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
                                    style={edit_errors.includes('email') ? error_style : {}}
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
                                    style={edit_errors.includes('phone') ? error_style : {}}
                                />
                            </div>
                        </div>
                    </section>

                    {/* 
                        ------------ Dream Work ------------
                    */}

                    <h2 className="lk__section-title">Желаемая работа</h2>
                    <section className="lk__section">
                    <h3>Тип работы</h3>
                        <div className="lk__work-status">
                            <input 
                                className="--hiden"
                                id="work_any"
                                type="radio"
                                name="work_status"
                                value='любая'
                                checked= {user_data.work_status === 'любая'}
                                onChange={event => handle_change(event)}
                            />
                            <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="work_any">Любая</label>

                            <input 
                                className="--hiden"
                                id="work_temporary"
                                type="radio"
                                name="work_status"
                                value='временная'
                                checked={user_data.work_status === 'временная'}
                                onChange={event => handle_change(event)}
                            />
                            <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="work_temporary">Временная</label>

                            <input 
                                className="--hiden"
                                id="work_fulltime"
                                type="radio"
                                name="work_status"
                                value='постоянная'
                                checked={user_data.work_status === 'постоянная'}
                                onChange={event => handle_change(event)}
                            />
                            <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="work_fulltime">Постоянная</label>
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
                                            name="title"
                                            placeholder="Повар горячего цеха"
                                            value= {exp_info.title}
                                            onChange={event => add_exp_info(event)}
                                            style={edit_errors.includes('title') ? error_style : {}}
                                        />
                                    </div>
                                    <div className="lk__contact --company">
                                        <h3>Название заведения</h3>
                                        <input
                                            className="card__input --mt1"
                                            type="text"
                                            name="employer"
                                            value= {exp_info.employer}
                                            onChange={event => add_exp_info(event)}
                                            style={edit_errors.includes('employer') ? error_style : {}}
                                        />
                                    </div>
                                </div>

                                <h3 className="--mt2">Какими были ваши обязательства</h3>
                                <textarea
                                    className="card__textarea --mt1"
                                    type="text"
                                    name="description"
                                    placeholder="Опишите ваши обязанности, объем работы и задачи"
                                    value= {exp_info.description}
                                    onChange={event => add_exp_info(event)}
                                    style={edit_errors.includes('description') ? error_style : {}}
                                />

                                <div className="experience__add-date add-date">
                                    <div className="add-date__block">
                                            <h3 className="card__label ld">Начало работы</h3>
                                            <div className="add-date__inputs">

                                                <select className="card__input --month --exp-month"
                                                    id="exp-month"
                                                    name="start_month"
                                                    value= {exp_info.start_month || '00'}
                                                    onChange={event => add_exp_info(event)}
                                                    style={edit_errors.includes('start_month') ? error_style : {}}
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
                                                    name="start_year"
                                                    value= {exp_info.start_year}
                                                    onChange={event => add_exp_info(event)}
                                                    style={edit_errors.includes('start_year') ? error_style : {}}
                                                />
                                        </div>
                                    </div>
                                    <img src={time_span} className='--exp-time-span'/>
                                    <div className="add-date__block">
                                            <h3 className="card__label ld">Окончание работы</h3>
                                            <div className="add-date__inputs">

                                                <select className="card__input --month --exp-month"
                                                    id="exp-month"
                                                    name="end_month"
                                                    value= {exp_info.end_month || '00'}
                                                    onChange={event => add_exp_info(event)}
                                                    style={edit_errors.includes('end_month') ? error_style : {}}
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
                                                    name="end_year"
                                                    value= {exp_info.end_year}
                                                    onChange={event => add_exp_info(event)}
                                                    style={edit_errors.includes('end_year') ? error_style : {}}
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