import React from 'react'
import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import '../../../../styles/utils/lk.css'
import './JobOffers.css'

import job_offers from '../../../../data/job_offers'
import JobOfferRow from './JobOfferRow'

function JobOffers(props) {

    return (
        <div className="lk">
            <LkNav page="job-offers" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2 className="--mt3">Активные вакансии</h2>
                    <JobOfferRow props={job_offers[0]} />
                    <JobOfferRow props={job_offers[0]} />
                    <JobOfferRow props={job_offers[0]} />
                    <JobOfferRow props={job_offers[0]} />
                    <JobOfferRow props={job_offers[0]} />
                    <JobOfferRow props={job_offers[0]} />
                    <h2 className="--mt3">Закрытые вакансии</h2>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default JobOffers