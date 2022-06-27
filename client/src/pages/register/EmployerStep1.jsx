import React from 'react'
import plus_icon from '../../img/icon-plus.svg'

function EmployerStep1(props) {

    const { form_data, on_change, errors } = props
    
    const error_style = {
        border: '2px solid red'
    } 

/*


*/
    return(
        <>
            <h2 className="card__title --ld">Регистрация</h2>

            <div className="card__logo">
                <input
                    className="--hiden"
                    id="logo"
                    type="file"
                    name="logo"
                />
                <label className="--photo-label" htmlFor="logo" >
                    <div className="card__photo">
                        <img className="icon-plus" src={plus_icon} alt=""/>
                    </div>
                    <h3 className="card__upload --ld">Загрузить фото</h3>
                </label>
			</div>

            <div className="card__fio">
                <h3 className="card__label --ld">Название заведения</h3>
                <input
                    className="card__input"
                    style={errors.includes('company') ? error_style : {}}
                    type="text"
                    name="company"
                    value={form_data.company}
                    onChange={(event) => on_change(event)}
                />
            </div>

            <div className="card__speciality">
                <h3 className="card__label --ld">ИНН</h3>
                <input
                    className="card__input"
                    type="tel"
                    style={errors.includes('inn') ? error_style : {}}
                    maxlength="12"
                    name="inn"
                    value={form_data.inn}
                    onChange={(event) => on_change(event)}
                />
            </div>
        </>
    )
}

export default EmployerStep1