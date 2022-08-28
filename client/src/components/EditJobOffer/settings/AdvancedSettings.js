import React from 'react'

import man from '../../../assets/svg/man.svg'
import woman from '../../../assets/svg/woman.svg'

export default function AdvancedSettings(props) {

    const { job_offer_data, handle_change, errors } = props

    const error_style = {
        border: '2px solid red'
    }

    const [inverse_left, set_inverse_left] = React.useState(3)
    const [inverse_right, set_inverse_right] = React.useState(3)


    const [thumb_left, set_thumb_left] = React.useState(99)
    const [thumb_right, set_thumb_right] = React.useState(0)

    function on_input_from (event) {
        const input_value = event.target.value
        event.target.value=Math.min(input_value, (job_offer_data.age.to || 46)-1)
        set_inverse_left((event.target.value - 13) * 3)
    }

    function on_input_to (event) {
        const input_value = event.target.value
        event.target.value=Math.max(input_value, (job_offer_data.age.from || 14) - (-1))
        set_inverse_right((event.target.value-48.5) * (-3))
    }

    function change_z_index(point) {
        if (point === 1) {
            set_thumb_left(0)
            set_thumb_right(99)
            document.querySelector('#thumb_1').classList.add('active')
            document.querySelector('#thumb_2').classList.remove('active')
        } else {
            set_thumb_left(99)
            set_thumb_right(0)
            document.querySelector('#thumb_2').classList.add('active')
            document.querySelector('#thumb_1').classList.remove('active')
        }
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
                    style={errors.includes('age_from') ? {error_style} : {}}
                    onInput={event => on_input_from(event)}
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
                    style={errors.includes('age_to') ? {error_style} : {}}
                    onInput={event => on_input_to(event)}
                />
            </div>
            <div className="sliders_control">
                <div className='--mt2'>
                    <div className='inverse-left' style={{width: inverse_left + '%'}}></div>
                    <div className='inverse-right' style={{width: inverse_right + '%', left: 99-inverse_right + '%'}}></div>
                    <div className='range'></div>
                    <span className='thumb' id='thumb_1' style={{left: inverse_left-3 + '%', zIndex: thumb_left+1}} onClick={()=> {change_z_index(1)}}><span>|</span><span>|</span></span>
                    <span className='thumb' id='thumb_2' style={{left: 99-inverse_right + '%', zIndex: thumb_right+1}} onClick={()=> {change_z_index(2)}}><span>|</span><span>|</span></span>
                </div>
                <input 
                    type="range" 
                    name="age_from"
                    id='age_from' 
                    onChange={event => handle_change(event)} 
                    value={job_offer_data.age.from || 14} 
                    max="46" 
                    min="14" 
                    onInput={(event) => {on_input_from(event)}}
                    style={{zIndex: thumb_right}} />

                <input 
                    type="range" 
                    name="age_to"
                    id='age_to' 
                    onChange={event => handle_change(event)} 
                    value={job_offer_data.age.to || 45} 
                    max="46" 
                    min="14" 
                    onInput={(event) => {on_input_to(event)}}
                    style={{zIndex: thumb_left}} />
                <div className='--row --mt1'>
                    <span>&#60;15</span>
                    <span className='label_18'>18</span>
                    <span className='label_21'>21</span>
                    <span className='label_25'>25</span>
                    <span className='label_35'>35</span>
                    <span className='label_45'>45</span>
                    <span className='label_45a'>&gt;45</span>
                </div>
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