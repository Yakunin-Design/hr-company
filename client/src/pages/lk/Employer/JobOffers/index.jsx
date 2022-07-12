import React from 'react'
import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import '../../../../styles/utils/lk.css'
import './JobOffers.css'

import job_offers from '../../../../data/job_offers'
import JobOfferRow from './JobOfferRow'
import EditJobOffer from '../../../../components/EditJobOffer'
import DisplayJobOffer from '../../../../components/DisplayJobOffer'
import axios from 'axios'

function JobOffers(props) {

    const [min_job_offers, set_min_job_offers] = React.useState([])

    // getting min job_offers
    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.get('http://localhost:6969/job-offers', config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }

                set_min_job_offers(res.data)
            })
            .catch(e => {
                console.log(e)
            })

    }, [])

    const active_job_offers = min_job_offers.map(jo => jo.status === 'active' && <JobOfferRow key={jo._id} data={jo} />)
    const closed_job_offers = min_job_offers.map(jo => jo.status === 'closed' && <JobOfferRow key={jo._id} data={jo} />)

    const [new_job_offer, set_new_job_offer] = React.useState(false)
    function toggle_new_job_offer() {
        set_new_job_offer(prev => !prev)
    }

    return (
        <div className="lk">
            <LkNav page="job-offers" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <div className="job-offers__active">
                        <h2>Активные вакансии</h2>
                        <button className="--primary-btn" onClick={toggle_new_job_offer}>Создать вакансию</button>
                    </div>

                    { active_job_offers[0] === false ? <p>У вас нет активных вакансий</p> : active_job_offers }

                    { closed_job_offers[0] != false && <h2 className="--mt3">Закрытые вакансии</h2> }
                    { closed_job_offers }

                    {/* <EditJobOffer /> */}
                </div>
                <Footer />
            </main>
            { new_job_offer && <EditJobOffer toggle_new_job_offer={toggle_new_job_offer} /> }
        </div>
    )
}

export default JobOffers