import React from 'react'

import { Link } from 'react-router-dom'

function SelectUserType(props) {

    const [err, set_err] = React.useState(false)

    function handle_type(type) {
        props.accept_tou ?
        props.set_step({
            type,
            step: 1
        })
        :
        set_err(true)
    }

    return (
        <>
            <h2 className="card__title --ld">Регистрация</h2>
            <button className="card__button --primary-btn" onClick={() => handle_type('worker')}>Как работник</button>
            <button className="card__button --secondary-btn --card-btn-secondary" onClick={() => handle_type('employer')}>Как работадатель</button>
            {err && <span className='card__wrong help__tou --v2 --mt2'>Пожалуйста примите пользвательское соглашение</span>}
        </>
    )
}

export default SelectUserType