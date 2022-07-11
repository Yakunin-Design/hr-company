import React from 'react'
import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import '../../../../styles/utils/lk.css'
import './JobOffers.css'

import job_offers from '../../../../data/job_offers'
import JobOfferRow from './JobOfferRow'
import EditJobOffer from '../../../../components/EditJobOffer'

const job_offers_data = job_offers[0]
function JobOffers(props) {

    /**
     * use effect [min job_offers]
     */

    /**
     *  show_full_job_offer (min job_offers) {
     *    axios [job_offer]
     *    
     * }
     */

    /**
     *  show_full_job_offer (min job_offers) {
     *    axios [job_offer]
     *    
     * }
     */

    return (
        <div className="lk">
            <LkNav page="job-offers" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2 className="--mt3">Активные вакансии</h2>



                    {

                        job_offers.map(job_offer => {
                            if (job_offer.status === 'active')
                            return <JobOfferRow props={job_offer}/>
                        })

                    }

                    <h2 className="--mt3">Закрытые вакансии</h2>

                    {

                        job_offers.map(job_offer => {
                            if (job_offer.status === 'closed')
                            return <JobOfferRow props={job_offer} />
                        })

                    }
                </div>
                <Footer />
            </main>
            <EditJobOffer props={job_offers_data}/>
        </div>
    )
}

export default JobOffers