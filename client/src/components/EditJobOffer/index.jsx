import React from 'react'
import './EditJobOffer.css'
import CloseIcon from '../../assets/svg/close-icon-white'
import man from '../../assets/svg/man.svg'
import woman from '../../assets/svg/woman.svg'

import EditJobOfferLogic from './EditJobOfferLogic'
import save_job_offer from './save_job_offer'

function EditJobOffer (props) {
    const activity = 'edit'

    const { job_offer_data, handle_change } = EditJobOfferLogic()

    return(
        <div className="JobOffer-container">

            <div onClick={props.toggle_new_job_offer}>
                <CloseIcon />
            </div>

            <div className="card JobOffer">



                <h2 className='--cd'>{activity === 'create' ? "Создание" : "Редактирование"} вакансии</h2>
                <hr className='--edit-top-hr'/>

                <div className='JobOffer__edit__input-block --specialty'>
                    <h3>Название вакансии</h3>
                    <input 
                        className='card__input JobOffer__edit__input --specialty-input' 
                        type="text" 
                        placeholder='Повар Универсал' 
                        name='specialty' 
                        value={job_offer_data.specialty}
                        onChange={event => handle_change(event)}
                    />
                </div>

                <div className='JobOffer__edit-location'>

                    <div className='JobOffer__edit__input-block --address'>
                        <h3>Адрес</h3>
                        <input 
                            className='card__input JobOffer__edit__input --address-input' 
                            type="text"
                            name='address' 
                            value={job_offer_data.address}
                            onChange={event => handle_change(event)}
                        />
                    </div>

                    <div className='JobOffer__edit__input-block --subway'>
                        <h3>Метро</h3>
                        <input 
                            className='card__input JobOffer__edit__input --subway-input' 
                            type="text"
                            name='subway' 
                            value={job_offer_data.subway}
                            onChange={event => handle_change(event)}
                        />
                    </div>

                </div>

                <div className="JobOffer__edit-pricing edit-pricing">
                    <h3>Ставка в час,₽</h3>
                    <input 
                        className='card__input JobOffer__edit__input --salary-input' 
                        type="tel"
                        name='amount'
                        value={job_offer_data.salary.amount} 
                        onChange={event => handle_change(event)}
                    />

                    <div className='edit-pricing__range-block'>

                        <div className='range-block__graph graph'>
                            <div className='graph__block' style={job_offer_data.salary.amount <= 120 ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 140 && job_offer_data.salary.amount > 120) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 160 && job_offer_data.salary.amount > 140) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 180 && job_offer_data.salary.amount > 160) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 200 && job_offer_data.salary.amount > 180) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 220 && job_offer_data.salary.amount > 200) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 240 && job_offer_data.salary.amount > 220) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 260 && job_offer_data.salary.amount > 240) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 280 && job_offer_data.salary.amount > 260) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 300 && job_offer_data.salary.amount > 280) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 320 && job_offer_data.salary.amount > 300) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 340 && job_offer_data.salary.amount > 320) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 360 && job_offer_data.salary.amount > 340) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 380 && job_offer_data.salary.amount > 360) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 400 && job_offer_data.salary.amount > 380) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 420 && job_offer_data.salary.amount > 400) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 440 && job_offer_data.salary.amount > 420) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 460 && job_offer_data.salary.amount > 440) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 480 && job_offer_data.salary.amount > 460) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 500 && job_offer_data.salary.amount > 480) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 520 && job_offer_data.salary.amount > 500) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 540 && job_offer_data.salary.amount > 520) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 560 && job_offer_data.salary.amount > 540) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 580 && job_offer_data.salary.amount > 560) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 600 && job_offer_data.salary.amount > 580) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 620 && job_offer_data.salary.amount > 600) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 640 && job_offer_data.salary.amount > 620) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 660 && job_offer_data.salary.amount > 640) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 680 && job_offer_data.salary.amount > 660) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 700 && job_offer_data.salary.amount > 680) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 720 && job_offer_data.salary.amount > 700) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 740 && job_offer_data.salary.amount > 720) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 760 && job_offer_data.salary.amount > 740) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 780 && job_offer_data.salary.amount > 760) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 800 && job_offer_data.salary.amount > 780) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 820 && job_offer_data.salary.amount > 800) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 840 && job_offer_data.salary.amount > 820) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 860 && job_offer_data.salary.amount > 840) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 880 && job_offer_data.salary.amount > 860) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 900 && job_offer_data.salary.amount > 880) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 920 && job_offer_data.salary.amount > 900) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 940 && job_offer_data.salary.amount > 920) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 960 && job_offer_data.salary.amount > 940) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={(job_offer_data.salary.amount <= 980 && job_offer_data.salary.amount > 960) ? {backgroundColor: "var(--accent)"} : {}}></div>
                            <div className='graph__block' style={job_offer_data.salary.amount >= 980 ? {backgroundColor: "var(--accent)"} : {}}></div>

                        </div>

                        <input 
                            className='edit__range' 
                            type="range" 
                            min="100" 
                            max="1000" 
                            name='amount'
                            value={job_offer_data.salary.amount} 
                            onChange={event => handle_change(event)}
                        />

                        <div className='edit-picing__label-container'>
                            <h4>100</h4>
                            <h4>200</h4>
                            <h4>300</h4>
                            <h4>400</h4>
                            <h4>500</h4>
                            <h4>600</h4>
                            <h4>700</h4>
                            <h4>800</h4>
                            <h4>900</h4>
                            <h4>1000</h4>
                        </div>

                    </div>

                </div>


                


                <h2 className='--cd --mt5'>Основные</h2>
                <p className='--cd'>Рекомендуем заполнить эти поля для повышения релевантности вакансии</p>
                <hr className='--edit-middle-hr'/>

                <div className="JobOffer__edit-experience edit-experience">
                    <h3>Стаж работы, г.</h3>
                    <input 
                        className='card__input JobOffer__edit__input --experience-input' 
                        type="tel"
                        name='experience'
                        value={job_offer_data.experience} 
                        onChange={event => handle_change(event)}
                        maxLength="2"
                    />

                    <div className='edit-pricing__range-block'>
                        <input 
                            className='edit__range' 
                            type="range" 
                            min="0" 
                            max="6" 
                            name='experience'
                            value={job_offer_data.experience}
                            onChange={event => handle_change(event)}
                        />

                        <div className='edit-picing__label-container'>
                            <h4>0</h4>
                            <h4>1</h4>
                            <h4>2</h4>
                            <h4>3</h4>
                            <h4>4</h4>
                            <h4>5</h4>
                            <h4> &gt;5 </h4>
                        </div>

                    </div>

                </div>

                <div className='JobOffer__edit-schedule edit-schedule'>

                    <div className='edit-schedule__schedule schedule'>
                        <h3>График</h3>

                        <div className='card schedule__card'>

                            <div className='schedule__block --first-sch-bl'>
                                <h3>Рабочие</h3>
                                <input 
                                    className='card__input JobOffer__edit__input --schedule-input' 
                                    type="tel"
                                    name='weekdays'
                                    value={job_offer_data.schedule.weekdays} 
                                    onChange={event => handle_change(event)}
                                    maxLength="1"
                                />

                            </div>

                            <span className='schedule__span --v2'>Через</span>

                            <div className='schedule__block --second-sch-bl'>
                                <h3>Выходные</h3>
                                <input 
                                    className='card__input JobOffer__edit__input --schedule-input' 
                                    type="tel"
                                    name='weekends'
                                    value={job_offer_data.schedule.weekends} 
                                    onChange={event => handle_change(event)}
                                    maxLength="1"
                                />
                            </div>

                        </div>

                    </div>

                    <div className='edit-schedule__working-time working-time'>
                        <h3>Рабочее время</h3>

                        <div className='card schedule__card'>

                            <div className='schedule__block'>
                                <h3>С</h3>
                                <input 
                                    className='card__input JobOffer__edit__input --working-time-input' 
                                    type="tel"
                                    name='wt-start'
                                    value={job_offer_data.working_time.start} 
                                    onChange={event => handle_change(event)}
                                    maxLength="5"
                                    placeholder='9:00'
                                />
                            </div>

                            <div className='schedule__block'>
                                <h3>По</h3>
                                <input 
                                    className='card__input JobOffer__edit__input --working-time-input' 
                                    type="tel"
                                    name='wt-end'
                                    value={job_offer_data.working_time.end} 
                                    onChange={event => handle_change(event)}
                                    maxLength="5"
                                    placeholder='21:00'
                                />
                            </div>
                        </div>
                    </div>
                </div>


                


                <h2 className='--cd --mt5'>Дополнительные</h2>
                <p className='--cd'>Заполнив эти настройки вы поможете правильным соискателям найти вашу вакансию</p>
                <hr className='--edit-bottom-hr'/>

                <div className='JobOffer__edit-additional additional'>
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
                <div className="JobOffer__edit-buttons">
                    <button className="btn --secondary-btn">Предпросмотр</button>
                    <button className="btn --primary-btn" onClick={() => save_job_offer(job_offer_data)}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default EditJobOffer