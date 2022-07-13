import React from 'react'
import axios from 'axios'

import JobOfferRow from './JobOfferRow'

export default function JobOffersContainer() {
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

    const active_job_offers = min_job_offers.map(jo => jo.status === 'active' && <JobOfferRow key={jo.id} data={jo} />)
    const closed_job_offers = min_job_offers.map(jo => jo.status === 'closed' && <JobOfferRow key={jo.id} data={jo} />)

    return {
        active_job_offers,
        closed_job_offers
    }
}