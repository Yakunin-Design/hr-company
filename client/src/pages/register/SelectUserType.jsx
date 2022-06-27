import React from 'react'

import { Link } from 'react-router-dom'

function SelectUserType(props) {

    function handle_type(type) {
        props.set_step({
            type,
            step: 1
        })
    }

    return (
        <>
            <h2 className="card__title --ld">Регистрация</h2>
            <button className="card__button --primary-btn" onClick={() => handle_type('worker')}>Как работник</button>
            <button className="card__button --secondary-btn --card-btn-secondary" onClick={() => handle_type('employer')}>Как работадатель</button>
        </>
    )
}

export default SelectUserType