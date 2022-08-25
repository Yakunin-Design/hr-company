import React from 'react'
import eye_closed from 'assets/svg/eye_closed.svg'
import eye_opened from 'assets/svg/eye.svg'

function WorkerStep2(props) {

    const { form_data, on_change, errors } = props

    let error_style = {
        border: '2px solid red'
    }

    const [eye_pass, set_eye_pass] = React.useState(false)
    const [eye_confirm, set_eye_confirm] = React.useState(false)

    return(
        <>
            <h2 className="card__title --ld">Контакты</h2>

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
                    type="email"
                    placeholder="mail@example.com"
                    style={errors.includes('email') ? error_style : {}}
                    name="email"
                    value={form_data.email}
                    onChange={(event) => on_change(event)}
                />
            </div>

            <div className="card__email">
                <h3 className="card__label --ld">Создание пароля</h3>
                <div className='password_input'>
                    <input
                        className="card__input"
                        type={eye_pass ? "text" : "password"}
                        name="password"
                        style={errors.includes('password') ? error_style : {}}
                        value={form_data.password}
                        onChange={(event) => on_change(event)}
                    />
                    <img src={eye_pass ? eye_opened : eye_closed} onClick={() => {set_eye_pass(prev => !prev)}} className="card__pass-eye"/>
                </div>
            </div>

            <div className="card__email">
                <h3 className="card__label --ld">Подтверждение пароля</h3>
                <div className='password_input'>
                    <input
                        className="card__input"
                        type={eye_confirm ? "text" : "password"}
                        style={errors.includes('password_confirmation') ? error_style : {}}
                        name="password_confirmation"
                        value={form_data.password_confirmation}
                        onChange={(event) => on_change(event)}
                    />
                    <img src={eye_confirm ? eye_opened : eye_closed} onClick={() => {set_eye_confirm(prev => !prev)}} className="card__pass-eye"/>
                </div>
            </div>

        </>
    )
}

export default WorkerStep2