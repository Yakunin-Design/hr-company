import React from 'react'

import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import '../../../../styles/utils/lk.css'
import './JobOffers.css'

import EditJobOffer from '../../../../components/EditJobOffer'

import JobOffersLogic from './JobOffersLogic'
import useToggle from './hooks/useToggle'

function JobOffers(props) {

    const { active_job_offers, closed_job_offers, points } = JobOffersLogic()
    const { new_job_offer, toggle_new_job_offer } = useToggle()
    return (
        <div className="lk">
            <LkNav page="job-offers" user_type={props.user.user_type}/>
            <main className="lk__container job-offers">

                <div className="--page-container --page-content">
                    <div className="job-offers__heading">
                        <h2 className="job-offers__title">Активные вакансии</h2>
                        <button className="job-offers__add --primary-btn" onClick={toggle_new_job_offer}>Создать вакансию</button>
                    </div>

                    { active_job_offers[0] === false ? <p>У вас нет активных вакансий</p> : active_job_offers }

                    { closed_job_offers[0] !== false && <h2 className="--mt3">Закрытые вакансии</h2> }
                    { closed_job_offers }
                </div>
                <Footer />
            </main>
            {new_job_offer && <EditJobOffer create toggle_new_job_offer={toggle_new_job_offer} points={points}/> }
        </div>
    )
}

export default JobOffers