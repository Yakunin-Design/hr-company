import React from 'react'

export default function AdvancedSettings(props) {

    const { job_offer_data, handle_change } = props

    return (
            <>
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

        </>
    )
}