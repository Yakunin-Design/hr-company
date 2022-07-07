import React from 'react'
import plus_icon from '../../../assets/svg/icon-plus.svg'

function WorkerStep1(props) {

    const { form_data, on_change, errors } = props
    
    const error_style = {
        border: '2px solid red'
    } 

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

            <div className="card__birthday">
				<h3 className="card__label ld">Дата рождения</h3>
                <div className="birthday">
                    <input
                        className="card__input --day"
                        type="tel"
                        maxLength="2"
                        name="day"
                        value={form_data.day}
                        style={errors.includes('day') ? error_style : {}}
                        onChange={(event) => on_change(event)}
                        placeholder="00"
                    />

                    <select className="card__input --month"
                        id="month"
                        value={form_data.month}
                        onChange={(event) => on_change(event)}
                        style={errors.includes('month') ? error_style : {}}
                        name="month"
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
                        value={form_data.year}
                        style={errors.includes('year') ? error_style : {}}
                        name="year"
                        onChange={(event) => on_change(event)}
                    />
                </div>	
			</div>

            <div className="card__citizenships">
                <h3 className="card__label --ld">Гражданство</h3>
                <div className="citizenships">
                    <input 
                        className="--hiden"
                        id="ru"
                        type="radio"
                        name="citizenship"
                        value="ru"
                        onChange={(event) => on_change(event)}
                    />
                    <label className="--radio-label" htmlFor="ru"
                        style={errors.includes('citizenship') ? error_style : {}}
                    >🇷🇺</label>

                    <input 
                        className="--hiden"
                        id="bu/ua"
                        type="radio"
                        name="citizenship"
                        value="bu/ua"
                        onChange={(event) => on_change(event)}
                    />
                    <label className="--radio-label" htmlFor="bu/ua"
                        style={errors.includes('citizenship') ? error_style : {}}
                    >🇧🇾/🇺🇦</label>

                    <input
                        className="--hiden"
                        id="sng"
                        type="radio"
                        name="citizenship"
                        value="sng"
                        onChange={(event) => on_change(event)}
                    />
                    <label className="--radio-label" htmlFor="sng"
                        style={errors.includes('citizenship') ? error_style : {}}
                    >СНГ</label>

                    <input 
                        className="--hiden"
                        id="other"
                        type="radio"
                        name="citizenship"
                        value="other"
                        onChange={(event) => on_change(event)}
                    />
                    <label className="--radio-label" htmlFor="other"
                        style={errors.includes('citizenship') ? error_style : {}}
                    >Другое</label>
                </div> 
			</div>

            <div className="card__speciality">
                <h3 className="card__label --ld">Специальность</h3>
                <input
                    className="card__input"
                    type="text"
                    style={errors.includes('specialty') ? error_style : {}}
                    placeholder="Повар-универсал"
                    name="specialty"
                    value={form_data.specialty}
                    onChange={(event) => on_change(event)}
                />
            </div>
        </>
    )
}

export default WorkerStep1