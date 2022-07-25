import React from 'react'

import Graph from '../../../../../components/EditJobOffer/settings/Graph'
import Subway from '../../../../../components/Subway'
import select_arrow from '../../../../../assets/svg/select_arrow.svg'
import subway_stations from '../../../../../data/subway_stations'

function display_period(period) {
    let display_period = []

    const start_amount = period === 'hour' ? 100 : period === 'month' ? 15000 : 500
    const end_amount = start_amount * 10
    for (let i = 1; i <= 10; i++) {
        i === 10 ? display_period.push(<h4>{">" + (end_amount-start_amount) / 9 * i}</h4>) : display_period.push(<h4>{(end_amount-start_amount) / 9 * i}</h4>)
    }

    return display_period
}


export default function JobPreference(props) {

    const subway_input_style = {
        paddingLeft: subway_stations.indexOf(props.user_data.subway) != -1 ? "3em" : "1.2em",
    }

    const { handle_change } = props

    console.log(props.user_data);

    return (
        <>
        <section className="lk__section">
            <h3>Тип работы</h3>
            <div className="lk__work-status">
                <input 
                    className="--hiden"
                    id="work_any"
                    type="radio"
                    name="job_type"
                    value='any'
                    checked={props.user_data.job_type === 'any'}
                    onChange={event => handle_change(event)}
                />
                <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="work_any">Любая</label>

                <input 
                    className="--hiden"
                    id="work_temporary"
                    type="radio"
                    name="job_type"
                    value='part_time'
                    checked={props.user_data.job_type === 'part_time'}
                    onChange={event => handle_change(event)}
                />
                <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="work_temporary">Временная</label>

                <input 
                    className="--hiden"
                    id="work_fulltime"
                    type="radio"
                    name="job_type"
                    value='full_time'
                    checked={props.user_data.job_type === 'full_time'}
                    onChange={event => handle_change(event)}
                />
                <label className="--radio-label --lk-radio --status-radio --cd" htmlFor="work_fulltime">Постоянная</label>
            </div> 

            <div className="edit-pricing">
                <div className='salary-label'>
                    <h3>Ставка в {props.user_data.salary.period === 'hour' ? 'час' : props.user_data.salary.period === 'month' ? 'месяц' : 'смену'}, ₽</h3>
                    <img src={select_arrow} />
                </div>
                <input
                    className='card__input JobOffer__edit__input --salary-input'
                    type="tel"
                    name='amount'
                    value={props.user_data.salary.amount}
                    onChange={event => handle_change(event)}
                />
                <select className="card__input --period"
                    id="period"
                    name="period"
                    value={props.user_data.salary.period}
                    onChange={event => handle_change(event)}
                >
                    <option value="hour">Час</option>
                    <option value="day">Смену</option>
                    <option value="month">Месяц</option>
                </select>

                <div className='edit-pricing__range-block'>

                    <Graph amount={props.user_data.salary.amount} period={props.user_data.salary.period} />

                    <input
                        className='edit__range'
                        type="range"
                        min={props.user_data.salary.period === 'hour' ? '100' : props.user_data.salary.period === 'month' ? '15000' : '500'}
                        max={props.user_data.salary.period === 'hour' ? '1000' : props.user_data.salary.period === 'month' ? '150000' : '5000'}
                        name='amount'
                        value={props.user_data.salary.amount}
                        onChange={event => handle_change(event)}
                    />

                    <div className='edit-picing__label-container'>
                        {/* { display_period(props.user_data.salary.period).map( label => label )} */}
                        { display_period(props.user_data.salary.period)}
                    </div>

                </div>

            </div>

                <div className='JobOffer__edit-location'>

                    <div className='JobOffer__edit__input-block --address'>
                        <h3>Район</h3>
                        <input
                            className='card__input JobOffer__edit__input --address-input'
                            type="text"
                            name='district'
                            value={props.user_data.address}
                            onChange={event => handle_change(event)}
                            // style={errors.includes('district') ? error_style : {}}
                        />
                    </div>

                    <div className='JobOffer__edit__input-block --subway'>
                        <h3>Метро</h3>
                        <input
                            className='card__input JobOffer__edit__input --subway-input'
                            type="text"
                            name='subway'
                            list='subways'
                            id='--subway-select'
                            value={props.user_data.subway}
                            onChange={event => handle_change(event)}
                            // style={errors.includes('subway') ? { ...error_style, ...subway_input_style } : { ...subway_input_style }}
                            style={subway_input_style}
                        />
                        {
                            subway_stations.indexOf(props.user_data.subway) != -1
                            &&
                            <div className='--subway-input-icon'>
                                <Subway station={props.user_data.subway} text_style="h4" />
                            </div>
                        }

                        <datalist id="subways">
                            { subway_stations.map((station) => <option value={station}>{station}</option>) }
                        </datalist>
                    </div>

                </div> 

        </section>

        </>
    )
}