import React from 'react'
import './EditJobOffer.css'
import CloseIcon from '../../assets/svg/close-icon-white'
import EditJobOfferLogic from './EditJobOfferLogic'
import save_job_offer from './save_job_offer'
import update_job_offer from './update_job_offer'

import DefaultSettings from './settings/DefaultSettings'
import MainSettings from './settings/MainSettings'
import AdvancedSettings from './settings/AdvancedSettings'

function EditJobOffer (props) {
    const activity = 'create'

    const { job_offer_data, handle_change, job_offer_сhanges, set_job_offer_changes } = EditJobOfferLogic()

    const stations = [
        'Девяткино' ,'Гражданский проспект','Академическая','Политехническая','Площадь мужества','Лесная','Выборгская','Площадь Ленина','Чернышевская' ,'Площадь Восстания','Владимирская','Пушкинская','Технологический институт 1','Балтийская','Нарвская','Кировский завод','Автово','Ленинский проспект','Проспект Ветеранов',
        'Парнас', 'Проспект Просвещения','Озерки','Удельная','Пионерская','Черная речка', 'Петроградская','Горьковская','Невский проспект','Сенная площадь','Технологический институт 2','Фрунзенская','Московские ворота','Электросила','Парк Победы','Московская','Звездная','Купчино',
        'Дыбенко','Ладожская','Новочеркасская','Пл.Александра Невского 2','Лиговский проспект','Достоевская','Спасская','Проспект Большевиков',
        'Беговая', 'Зенит','Приморская','Василеостровская','Гостиный Двор','Маяковская','Зенит','Пл.Александра Невского 1' ,'Елизаровская' ,'Ломоносовская','Пролетарская','Обухово','Рыбацкое',
        'Комендантский проспект', 'Старая деревня','Крестовский остров','Чкаловская','Спортивная','Адмиралтейская' ,'Садовая','Звенигородская','Обводной канал','Волковская','Бухаресткая','Международная','Проспект Славы','Дунайская','Шушары'
    ]

    const [errors, set_errors] = React.useState([])
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
                <DefaultSettings job_offer_data={job_offer_data} handle_change={handle_change} errors={errors}/>


                <h2 className='--cd --mt5'>Основные</h2>
                <p className='--cd'>Рекомендуем заполнить эти поля для повышения релевантности вакансии</p>
                <hr className='--edit-middle-hr'/>
                <MainSettings job_offer_data={job_offer_data} handle_change={handle_change} errors={errors}/>


                <h2 className='--cd --mt5'>Дополнительные</h2>
                <p className='--cd'>Заполнив эти настройки вы поможете правильным соискателям найти вашу вакансию</p>
                <hr className='--edit-bottom-hr'/>
                <AdvancedSettings job_offer_data={job_offer_data} handle_change={handle_change} errors={errors}/>


                <div className="JobOffer__edit-buttons">
                    <button className="btn --secondary-btn">Предпросмотр</button>
                    {
                        activity === 'edit'
                        ?
                        <button className="btn --primary-btn" onClick={() => update_job_offer(job_offer_data, job_offer_сhanges, set_job_offer_changes)}>Сохранить</button>
                        :
                        <button className="btn --primary-btn" onClick={() => save_job_offer(job_offer_data, errors, set_errors, stations)}>Сохранить</button>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default EditJobOffer