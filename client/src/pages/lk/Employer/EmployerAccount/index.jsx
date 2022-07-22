import React from 'react'
import axios from 'axios'

import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import '../../../../styles/utils/lk.css'

import edit_pencil from '../../../../assets/svg/edit_pencil.svg'
import {check_full_name, check_email, check_phone} from '../../../../functions/validations'


function EmployerAccount(props) {

    const [edit_errors, set_edit_errors] = React.useState([])
    const [show_save_btn, set_show_save_btn] = React.useState(false)
    const [change_description, set_change_description] = React.useState(false)

    const [emp_data, set_emp_data] = React.useState({
        ...props.user.user_data,
        description: props.user.user_data.description ? props.user.user_data.description : ''
    })

    const [edits, set_edits] = React.useState([])

    function handle_change(event) {
        const {name, value} = event.target

        set_show_save_btn(true)

        set_edits(prev => prev.filter(edit => edit != name ))
        set_edits(prev => [...prev, name])

        set_emp_data(prev_emp_data => {
            return {
                ...prev_emp_data,
                [name]: value
            }
        })
    }

    /*

    edits (api): 
    {
        "full_name": "petr petrov"
        "email": "pert@rus.ru"
    }

    errors-state:
    ['phone']

    */

    function add_data(data, edit) {
        data[edit] = emp_data[edit]
        set_edits(prev => prev.filter(edit => edit != emp_data[edit] ))
    }

    function save_data() {
        console.log(edits)
        let data = {}
        const err = []

        edits.forEach(edit => {
            if (edit === 'full_name') {
                check_full_name(emp_data[edit]) ? add_data(data,edit) : err.push(edit)
            }
            if (edit === 'email') {
                check_email(emp_data[edit]) ? add_data(data,edit) : err.push(edit)
            }
            if (edit === 'phone') {
                check_phone(emp_data[edit]) ? add_data(data, edit) : err.push(edit)
            }
            if (edit === 'description') {
                (emp_data[edit].length >=20 && emp_data[edit].length <=120) ? add_data(data, edit) : err.push(edit)
            }
        })

        set_edit_errors(err)

        const jwt = localStorage.getItem('jwt') || ''

        // send data to api to save changes to db
        axios.post('http://localhost:6969/profile/edit', data, {headers : {authorization : 'Bearer ' + jwt}})

        if (err.length === 0) {
            set_show_save_btn(false)
            set_change_description(false)
        }

        console.log("Err:")
        console.log(err)
        console.log("Data:")
        console.log(data)
    }

    function log_out() {
        const confirm_log_out = window.confirm('Вы уверены что хотите выйти из аккаунта ?')
        if (confirm_log_out) {
            localStorage.removeItem('jwt')
            window.location.replace('/login')
        }
    }

    function on_change_description() {
        set_change_description(true)
    }

    const error_style = {
        border: '2px solid red'
    } 

    return (
        <div className="lk">

            <LkNav page='profile' user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">

                    {show_save_btn && <div className="--primary-btn --save-btn" onClick={save_data}>Сохранить</div>}

                    <section className="lk__section lk__basic-info --employer-basic-info">
                        <div className="personal_data__avatar-block --employer-avatar-block">
                            <div className="--avatar"></div>
                        </div>

                        <img src={edit_pencil} className='--edit_pencil' alt='' onClick={on_change_description}/>

                        <h2 className="--mt2">{emp_data.company}</h2>
                        {
                            change_description
                            ?
                            <textarea
                                className="card__textarea additional__textarea --mt1"
                                type="text"
                                name="description"
                                placeholder="Опишите работу в вашем заведении"
                                value= {emp_data.description}
                                onChange={event => handle_change(event)}
                                style={edit_errors.includes('description') ? error_style : {}}
                            />
                            :
                            <p className="--mt1">{emp_data.description ? emp_data.description : <span className="documents__add" onClick={on_change_description}>Добавить описание + </span>}</p>
                        }
                        
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
                            style={edit_errors.includes('full_name') ? error_style : {}}
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
                                    value={emp_data.phone}
                                    onChange={event => handle_change(event)}
                                    style={edit_errors.includes('phone') ? error_style : {}}
                                />
                            </div>
                        </div>
                    </section>

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

export default EmployerAccount