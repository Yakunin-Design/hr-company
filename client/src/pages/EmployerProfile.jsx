import React from 'react'
import LkNav from '../components/LkNav'
import Footer from '../components/Footer'
import { check_email, check_phone, check_full_name } from '../functions/validations'
import '../styles/utils/lk.css'
import edit_pencil from '../img/edit_pencil.svg'

function EmployerProfile(props) {
    const [unsaved_changes, set_unsaved_changes] = React.useState(false)
    // {pole: new_value}
    const [user_data, set_user_data] = React.useState({
        ...props.user.user_data,
        description: ''
    })

    console.log(user_data)

    function handle_change(event) {
        const {name, value} = event.target

        set_unsaved_changes(true)

        set_user_data(prev_user_data => {
            return {
                ...prev_user_data,
                [name]: value
            }
        })
    }

    function save_data() {
        // validation

        set_unsaved_changes(false)

        // send data to api
        console.log(user_data)
    }

    function log_out() {
        localStorage.removeItem('jwt')
        window.location.replace('/login')
    }

    return (
        <div className="lk">

            <LkNav page='profile' user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">

                    {unsaved_changes && <div className="--primary-btn --save-btn" onClick={save_data}>Сохранить</div>}

                    <section className="lk__section lk__basic-info --employer-basic-info">
                        <div className="personal_data__avatar-block --employer-avatar-block">
                            <div className="--avatar"></div>
                        </div>

                        <img src={edit_pencil} className='--edit_pencil'/>

                        <h2 className="--mt2">{user_data.company}</h2>
                        <p className="--mt1">{user_data.description ? user_data.description : <span className="documents__add">Добавить описание + </span>}</p>
                    </section>

                    <h2 className="lk__section-title">Контактное лицо</h2>
                    <section className="lk__section">

                        <h3>ФИО</h3>
                        <input
                            className="card__input --mt1"
                            type="text"
                            name="full_name"
                            value={user_data.full_name}
                            onChange={event => handle_change(event)}
                        />

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

export default EmployerProfile