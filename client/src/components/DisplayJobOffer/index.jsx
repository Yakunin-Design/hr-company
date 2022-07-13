import React from 'react'
import DisplayJobOfferLogic from './DisplayJobOfferLogic'
import './DisplayJobOffer.css'

import CloseIcon from '../../assets/svg/close-icon-white'
import clock from '../../assets/svg/clock.svg'

import get_period from '../../functions/get_created_time'

import InfoBlock from './InfoBlock'
import WorkerCard from '../WorkerCard'

function DisplayJobOffer(props) {

    const { job_offer_data, description } = DisplayJobOfferLogic(props)

    return(
        <div className="JobOffer-container">

            <CloseIcon handle_click={props.handle_click} />

            <div className="card JobOffer">
                <div className="JobOffer__header">
                    <div className="JobOffer__company-logo company-logo">
                        <div className="company-logo__image"></div>
                    </div>

                    <h2 className="--mt1 --cd">{job_offer_data.specialty}</h2>
                    <div className="JobOffer__company-info">
                        <h4 className="JobOffer__company-name">Макдональдс</h4>
                        <h4 className="JobOffer__separator">|</h4>
                        <div className="company-info__created">
                            <img src={clock} />
                            <h4>{get_period(job_offer_data.created)}</h4>
                        </div>
                    </div>
                    <button className="JobOffer__edit-btn --primary-btn --mt2">Редактировать</button>
                </div>
                <hr className='JobOffer_hr --top-hr'/>

                <div className="JobOffer__main">
                    <div className="JobOffer__description">{job_offer_data.description ? <p>{description}</p> : <h3>Описание отсутствует</h3>}</div>

                    <InfoBlock job_offer_data={job_offer_data} />

                </div>
                <hr className='JobOffer_hr --bottom-hr'/>
                <div className='JobOffer__candidates'>
                    <h2 className='--cd --mt2'>Кандидаты</h2>
                    {
                        job_offer_data.candidate_count === []
                        ?
                        <div className='JobOffer__candidates_container'>
                            {/* <WorkerCard /> */}
                        </div>
                        :
                        <h3 className='--mt1 --cd'>Кандидаты отсутствуют</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default DisplayJobOffer