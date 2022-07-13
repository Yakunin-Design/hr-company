import React from 'react'

import Graph from './Graph'
import Subway from '../../Subway'
import select_arrow from '../../../assets/svg/select_arrow.svg'

export default function AdvancedSettings(props) {

    const { job_offer_data, handle_change } = props

    const stations = [
        'Девяткино' ,'Гражданский проспект','Академическая','Политехническая','Площадь мужества','Лесная','Выборгская','Площадь Ленина','Чернышевская' ,'Площадь Восстания','Владимирская','Пушкинская','Технологический институт 1','Балтийская','Нарвская','Кировский завод','Автово','Ленинский проспект','Проспект Ветеранов',
        'Парнас', 'Проспект Просвещения','Озерки','Удельная','Пионерская','Черная речка', 'Петроградская','Горьковская','Невский проспект','Сенная площадь','Технологический институт 2','Фрунзенская','Московские ворота','Электросила','Парк Победы','Московская','Звездная','Купчино',
        'Дыбенко','Ладожская','Новочеркасская','Пл.Александра Невского 2','Лиговский проспект','Достоевская','Спасская','Проспект Большевиков',
        'Беговая', 'Зенит','Приморская','Василеостровская','Гостиный Двор','Маяковская','Зенит','Пл.Александра Невского 1' ,'Елизаровская' ,'Ломоносовская','Пролетарская','Обухово','Рыбацкое',
        'Комендантский проспект', 'Старая деревня','Крестовский остров','Чкаловская','Спортивная','Адмиралтейская' ,'Садовая','Звенигородская','Обводной канал','Волковская','Бухаресткая','Международная','Проспект Славы','Дунайская','Шушары'
    ]

    function display_period(period) {
        let display_period = []

        const start_amount = period === 'hour' ? 100 : period === 'month' ? 15000 : 500
        const end_amount = start_amount * 10
        for (let i = 1; i <= 10; i++) {
            i === 10 ? display_period.push(<h4>{">" + (end_amount-start_amount) / 9 * i}</h4>) : display_period.push(<h4>{(end_amount-start_amount) / 9 * i}</h4>)
        }

        return display_period
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
                    list='subways'
                    id='--subway-select'
                    value={job_offer_data.subway}
                    onChange={event => handle_change(event)}
                    style={stations.indexOf(job_offer_data.subway) != -1 ? {paddingLeft: "3em"} : {paddingLeft: "1.2em"}}
                />
                <img src={select_arrow} className='--select-arrow'/>
                {
                    stations.indexOf(job_offer_data.subway) != -1 
                    &&
                    <div className='--subway-input-icon'>
                        <Subway station={job_offer_data.subway} text_style="h4" />
                    </div>
                }

                <datalist id="subways">
                    {
                        stations.map((station) => { return <option value={station}>{station}</option> })
                    }
                </datalist>
            </div>

        </div>

        <div className="JobOffer__edit-pricing edit-pricing">
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