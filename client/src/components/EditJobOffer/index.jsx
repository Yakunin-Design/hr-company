import React from 'react'
import './EditJobOffer.css'
import CloseIcon from '../../assets/svg/close-icon-white'

import EditJobOfferLogic from './EditJobOfferLogic'
import save_job_offer from './save_job_offer'

import DefaultSettings from './settings/DefaultSettings'
import MainSettings from './settings/MainSettings'
import AdvancedSettings from './settings/AdvancedSettings'

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
                <DefaultSettings job_offer_data={job_offer_data} handle_change={handle_change} />


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