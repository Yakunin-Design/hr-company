import React from 'react'

import axios from 'axios'
import description_dipslay from './description_display'

export default function DisplayJobOfferLogic(props) {

    const [job_offer_data, set_job_offer_data] = React.useState({
        schedule: {
            weekdays: 0,
            weekends: 0
        },
        citizenships: 'any',
        specialty: '',
        subway: '',
        company: '',
        description: '',
        working_time: {
            start: '00:00',
            end: '00:00'
        },
        sex: '',
        salary: {
            period: 'hour',
            amount: ''
        }
    })


    let description = description_dipslay(job_offer_data.description)
    // Getting full job offer
    React.useEffect(() => {

        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.get(`http://localhost:6969/job-offers/${props.id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }

                set_job_offer_data(res.data)
            })
            .catch(e => {
                console.log(e)
            })

    }, [])

    return {job_offer_data, description}
}