import React from 'react'

import Graph from './Graph'
import Subway from '../../Subway'
import subway_stations from '../../../data/subway_stations'
import select_arrow from '../../../assets/svg/select_arrow.svg'

function display_period(period) {
    let display_period = []

    const start_amount = period === 'hour' ? 100 : period === 'month' ? 15000 : 500
    const end_amount = start_amount * 10
    for (let i = 1; i <= 10; i++) {
        i === 10 ? display_period.push(<h4>{">" + (end_amount-start_amount) / 9 * i}</h4>) : display_period.push(<h4>{(end_amount-start_amount) / 9 * i}</h4>)
    }

    return display_period
}

export default function DefaultSettings(props) {

    const { job_offer_data, handle_change, errors } = props

    const error_style = {
        border: '2px solid red'
    }

    const subway_input_style = {
        paddingLeft: subway_stations.indexOf(job_offer_data.subway) != -1 ? "3em" : "1.2em",
    }

    return (
        <>
        <div className='JobOffer__edit__input-block --specialty'>
            <h3>Название вакансии</h3>
            <input 
                className='card__input JobOffer__edit__input --specialty-input' 
                type="text" 
                placeholder='Повар Универсал' 
                name='specialty' 
                value={job_offer_data.specialty}
                onChange={event => handle_change(event)}
                style={errors.includes('specialty') ? error_style : {}}
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
                    style={errors.includes('address') ? error_style : {}}
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
                    value={job_offer_data.subway}
                    onChange={event => handle_change(event)}
                    style={errors.includes('subway') ? {...error_style, ...subway_input_style} : {...subway_input_style}}
                />
                <img src={select_arrow} className='--select-arrow'/>
                {
                    subway_stations.indexOf(job_offer_data.subway) != -1 
                    &&
                    <div className='--subway-input-icon'>
                        <Subway station={job_offer_data.subway} text_style="h4" />
                    </div>
                }

                <datalist id="subways">
                    {
                        subway_stations.map((station) => { return <option value={station}>{station}</option> })
                    }
                </datalist>
            </div>

        </div>

        <div className="edit-pricing">
            <div className='salary-label'>
                <h3>Ставка в {job_offer_data.salary.period === 'hour' ? 'час' : job_offer_data.salary.period === 'month' ? 'месяц' : 'смену'},₽</h3>
                <img src={select_arrow}/>
            </div>
            <input 
                className='card__input JobOffer__edit__input --salary-input' 
                type="tel"
                name='amount'
                value={job_offer_data.salary.amount} 
                onChange={event => handle_change(event)}
            />
            <select className="card__input --period"
                id="period"
                name="period"
                value={job_offer_data.salary.period}
                onChange={event => handle_change(event)}
            >
                <option value="hour">Час</option>
                <option value="day">Смену</option>
                <option value="month">Месяц</option>
            </select>

            <div className='edit-pricing__range-block'>

                <Graph amount={job_offer_data.salary.amount} period={job_offer_data.salary.period}/>

                <input 
                    className='edit__range' 
                    type="range" 
                    min={job_offer_data.salary.period === 'hour' ? '100' : job_offer_data.salary.period === 'month' ? '15000' : '500'}
                    max={job_offer_data.salary.period === 'hour' ? '1000' : job_offer_data.salary.period === 'month' ? '150000' : '5000'}
                    name='amount'
                    value={job_offer_data.salary.amount} 
                    onChange={event => handle_change(event)}
                />

                <div className='edit-picing__label-container'>
                    {
                        display_period(job_offer_data.salary.period).map(label => {return label})
                    }
                </div>

            </div>

        </div>
        </>
    )
}