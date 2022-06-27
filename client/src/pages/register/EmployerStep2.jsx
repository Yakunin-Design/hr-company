import React from 'react'

function EmployerStep2(props) {

    const { form_data, on_change, errors } = props

    let error_style = {
        border: '2px solid red'
    } 

    return(
        <>
            <h2 className="card__title --ld">Контактное лицо</h2>

            <div className="card__fio">
                <h3 className="card__label --ld">ФИО</h3>
                <input
                    className="card__input"
                    style={errors.includes('full_name') ? error_style : {}}
                    type="text"
                    name="full_name"
                    placeholder="Фамилия Имя Отчество"
                    value={form_data.full_name}
                    onChange={(event) => on_change(event)}
                />
            </div>

            <div className="card__phone">
                <h3 className="card__label --ld">Номер телефона</h3>
                <input
                    className="card__input"
                    type="tel"
                    placeholder="+7 (911) 123 45 67"
                    style={errors.includes('phone') ? error_style : {}}
                    name="phone"
                    value={form_data.phone}
                    onChange={(event) => on_change(event)}
                />
            </div>

            <div className="card__email">
                <h3 className="card__label --ld">Email</h3>
                <input
                    className="card__input"
                    type="text"
                    placeholder="mail@example.com"
                    style={errors.includes('email') ? error_style : {}}
                    name="email"
                    value={form_data.email}
                    onChange={(event) => on_change(event)}
                />
            </div>

            <div className="card__email">
                <h3 className="card__label --ld">Создание пароля</h3>
                <input
                    className="card__input"
                    type="password"
                    name="password"
                    style={errors.includes('password') ? error_style : {}}
                    value={form_data.password}
                    onChange={(event) => on_change(event)}
                />
            </div>

            <div className="card__email">
                <h3 className="card__label --ld">Подтверждение пароля</h3>
                <input
                    className="card__input"
                    type="password"
                    style={errors.includes('password_confirmation') ? error_style : {}}
                    name="password_confirmation"
                    value={form_data.password_confirmation}
                    onChange={(event) => on_change(event)}
                />
            </div>

        </>
    )
}

export default EmployerStep2