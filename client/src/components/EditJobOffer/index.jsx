import React from 'react'
import './EditJobOffer.css'
import '../../styles/modal_sheet.css'

import CloseIcon from '../../assets/svg/close-icon-white'
import EditJobOfferLogic from './EditJobOfferLogic'

import DefaultSettings from './settings/DefaultSettings'
import MainSettings from './settings/MainSettings'
import AdvancedSettings from './settings/AdvancedSettings'

function EditJobOffer(props) {
    const { job_offer_data, handle_change, on_save, on_update, errors } = EditJobOfferLogic({...props.old_data, points: props.points} || {})

    return(
        <div className="--modal-sheet-overlay">

            <div onClick={props.toggle_new_job_offer}>
                <CloseIcon />
            </div>

            <div className="card modal-sheet edit-job-offer">
                <h2 className='modal-sheet__container --cd --mt2'>{props.create ? "Создание" : "Редактирование"} вакансии</h2>
                <hr/>
                <div className="modal-sheet__container">
                    <DefaultSettings
                        job_offer_data={job_offer_data}
                        handle_change={handle_change}
                        errors={errors}
                        points={props.points}
                    />
                    <h2 className='--cd --mt5'>Основные</h2>
                    <p className='--cd'>Рекомендуем заполнить эти поля для повышения релевантности вакансии</p>
                </div>

                <hr/>

                <div className="modal-sheet__container">
                    <MainSettings
                        job_offer_data={job_offer_data}
                        handle_change={handle_change}
                        errors={errors}
                    />

                    <h2 className='--cd --mt5'>Дополнительные</h2>
                    <p className='--cd'>Заполнив эти настройки вы поможете правильным соискателям найти вашу вакансию</p>

                    </div>
                <hr/>

                <div className="modal-sheet__container">
                    <AdvancedSettings
                        job_offer_data={job_offer_data}
                        handle_change={handle_change}
                        errors={errors}
                    />

                    <div className="edit-buttons">
                        <button className="btn --secondary-btn">Предпросмотр</button>
                        {
                            !props.create
                            ?
                            <button className="btn --primary-btn" onClick={() => on_update(props.id, job_offer_data)}>Сохранить</button>
                            :
                            <button className="btn --primary-btn" onClick={() => on_save(job_offer_data)}>Сохранить</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditJobOffer