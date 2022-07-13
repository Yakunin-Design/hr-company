import React from 'react'
import './EditJobOffer.css'
import CloseIcon from '../../assets/svg/close-icon-white'
<<<<<<< HEAD

=======
import man from '../../assets/svg/man.svg'
import woman from '../../assets/svg/woman.svg'
import Subway from '../Subway'
import select_arrow from '../../assets/svg/select_arrow.svg'
>>>>>>> dba6e517a17c44f65321690aa5bb42b2fa2286e5
import EditJobOfferLogic from './EditJobOfferLogic'
import save_job_offer from './save_job_offer'

import DefaultSettings from './settings/DefaultSettings'
import MainSettings from './settings/MainSettings'
import AdvancedSettings from './settings/AdvancedSettings'

function EditJobOffer (props) {
    const activity = 'edit'

    const { job_offer_data, handle_change } = EditJobOfferLogic()

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

    return(
        <div className="JobOffer-container">

            <div onClick={props.toggle_new_job_offer}>
                <CloseIcon />
            </div>

            <div className="card JobOffer">
                <h2 className='--cd'>{activity === 'create' ? "Создание" : "Редактирование"} вакансии</h2>
                <hr className='--edit-top-hr'/>
<<<<<<< HEAD
                <DefaultSettings job_offer_data={job_offer_data} handle_change={handle_change} />
=======

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
                            min={job_offer_data.salary.period === 'hour' ? '100' : job_offer_data.salary.period === 'month' ? '15000' : '500'}
                            max={job_offer_data.salary.period === 'hour' ? '1000' : job_offer_data.salary.period === 'month' ? '150000' : '5000'}
                            name='amount'
                            value={job_offer_data.salary.amount} 
                            onChange={event => handle_change(event)}
                        />

                        <div className='edit-picing__label-container'>
                            {
                                display_period(job_offer_data.salary.period).map(label => { return label})
                            }
                        </div>

                    </div>

                </div>


                
>>>>>>> dba6e517a17c44f65321690aa5bb42b2fa2286e5


                <h2 className='--cd --mt5'>Основные</h2>
                <p className='--cd'>Рекомендуем заполнить эти поля для повышения релевантности вакансии</p>
                <hr className='--edit-middle-hr'/>
                <MainSettings job_offer_data={job_offer_data} handle_change={handle_change} />


                <h2 className='--cd --mt5'>Дополнительные</h2>
                <p className='--cd'>Заполнив эти настройки вы поможете правильным соискателям найти вашу вакансию</p>
                <hr className='--edit-bottom-hr'/>
                <AdvancedSettings job_offer_data={job_offer_data} handle_change={handle_change} />


                <div className="JobOffer__edit-buttons">
                    <button className="btn --secondary-btn">Предпросмотр</button>
                    <button className="btn --primary-btn" onClick={() => save_job_offer(job_offer_data)}>Сохранить</button>
                </div>
            </div>
            
        </div>
    )
}

export default EditJobOffer