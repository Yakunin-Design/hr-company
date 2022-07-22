import React from 'react'

import man from '../../../assets/svg/man.svg'
import woman from '../../../assets/svg/woman.svg'

export default function AdvancedSettings(props) {

    const { job_offer_data, handle_change, errors } = props

    const error_style = {
        border: '2px solid red'
    }

    return (
        <>
        <div>
            <div className='additional__citizenship'>
                <h3 className="--ld">Гражданство</h3>
                <div className="citizenships --lk-citizenships --edit-citizenships">
                    <input 
                        className="--hiden"
                        id="other"
                        type="radio"
                        name="citizenship"
                        value="other"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.citizenship === 'other'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="other">Другое</label>

                    <input
                        className="--hiden"
                        id="sng"
                        type="radio"
                        name="citizenship"
                        value="sng"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.citizenship === 'sng'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="sng">СНГ</label>

                    <input 
                        className="--hiden"
                        id="bu/ua"
                        type="radio"
                        name="citizenship"
                        value="bu/ua"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.citizenship === 'bu/ua'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="bu/ua">🇧🇾/🇺🇦</label>

                    <input 
                        className="--hiden"
                        id="ru"
                        type="radio"
                        name="citizenship"
                        value="ru"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.citizenship === 'ru'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="ru">🇷🇺</label>
                </div>
            </div>
            <div className='additional__sex'>
                <h3 className="--ld">Пол</h3>
                <div className="sex --lk-sex">
                    <input 
                        className="--hiden"
                        id="all"
                        type="radio"
                        name="sex"
                        value="any"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.sex === 'any'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="all">Любой</label>

                    <input
                        className="--hiden"
                        id="male"
                        type="radio"
                        name="sex"
                        value="male"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.sex === 'male'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="male"><img src={man}/></label>

                    <input 
                        className="--hiden"
                        id="female"
                        type="radio"
                        name="sex"
                        value="female"
                        onChange={event => handle_change(event)}
                        checked={job_offer_data.sex === 'female'}
                    />
                    <label className="--radio-label --lk-radio --cd --edit-labels" htmlFor="female"><img src={woman}/></label>
                </div>
            </div>
        </div>

        <div className='additional__age age'>
            <h3>Возраст</h3>
            <div className='age__count'>
                <h3>от</h3>
                <input
                    className='card__input JobOffer__edit__input --age-input' 
                    type="tel" 
                    name="age_from"
                    id='fromInput'
                    value={job_offer_data.age.from}
                    onChange={event => handle_change(event)}
                    maxLength="2"
                    style={errors.includes('age_from') ? error_style : {}}
                />
                <h3>до</h3>
                <input 
                    className='card__input JobOffer__edit__input --age-input' 
                    type="tel" 
                    name="age_to"
                    id='toInput'
                    value={job_offer_data.age.to}
                    onChange={event => handle_change(event)}
                    maxLength="2"
                    style={errors.includes('age_to') ? error_style : {}}
                />
            </div>
            <div className="sliders_control">
                <input 
                    className='edit__range --age-range'
                    id="fromSlider"
                    name="age_from" 
                    type="range" 
                    value={job_offer_data.age.from} 
                    min="14" 
                    max="46"
                    onChange={event => handle_change(event)}
                />
                <input 
                    className='edit__range --age-range'
                    id="toSlider" 
                    name="age_to"
                    type="range" 
                    value={job_offer_data.age.to} 
                    min="14" 
                    max="46"
                    onChange={event => handle_change(event)}
                />
            </div>
        </div>

        <div className='additional__description'>
            <h3>Требования и компетенции</h3>
            <textarea
                className="card__textarea additional__textarea --mt1"
                type="text"
                name="description"
                placeholder={"Обязанности:\n    - \n    - \nТребования:\n    - \n    - \nУсловия:\n    - \n    - \n"}
                value= {job_offer_data.description ? job_offer_data.description : "Обязанности:\n    - \n    - \nТребования:\n    - \n    - \nУсловия:\n    - \n    - \n"}
                onChange={event => handle_change(event)}
            />
        </div>
        </>
    )
}