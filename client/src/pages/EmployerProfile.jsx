import React from 'react'
import LkNav from '../components/LkNav'
import Footer from '../components/Footer'
import '../styles/utils/lk.css'
import edit_pencil from '../img/edit_pencil.svg'

function EmployerProfile(props) {

    const [emp_data, set_emp_data] = React.useState({
        ...props.user.user_data,
        description: ''
    })

    const [unsaved_changes, set_unsaved_changes] = React.useState(false);

    function handle_change(event) {
        const {name, value} = event.target

        set_unsaved_changes(true)

        set_emp_data(prev_employer_data => {
            return {
                ...prev_employer_data,
                [name]: value
            }
        })
    }

    function save_data() {
        // validation
        set_unsaved_changes(false)

        // send data to api
        console.log(emp_data)
    }

    function log_out() {
        const confirm_log_out = window.confirm('Вы уверены что хотите выйти из аккаунта ?')
        if (confirm_log_out) {
            localStorage.removeItem('jwt')
            window.location.replace('/login')
        }
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

                        <img src={edit_pencil} className='--edit_pencil' alt=''/>

                        <h2 className="--mt2">{emp_data.company}</h2>
                        <p className="--mt1">{emp_data.description ? emp_data.description : <span className="documents__add">Добавить описание + </span>}</p>
                    </section>

                    <h2 className="lk__section-title">Контактное лицо</h2>
                    <section className="lk__section">

                        <h3>ФИО</h3>
                        <input
                            className="card__input --mt1"
                            type="text"
                            name="full_name"
                            value={emp_data.full_name}
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
                                    value={emp_data.email}
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
                                    value={emp_data.phone}
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