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

    const [show_edit, set_show_edit] = React.useState(false)
    const [responded, set_responded] = React.useState(false)

    // props.id
    function toggle_edit() {
        set_show_edit(prev => !prev)
    }

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


    function jo_respond() {
        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.get(`http://localhost:6969/find-user`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }

                if (res.data.user_type === 'worker') {
                    add_respond(res.data.id)
                } 

            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login')
                }
            })
    }

    function add_respond(worker_id) {

        const request_data = {
            worker_id,
            job_offer_id: props.id
        }

        axios.post('http://localhost:6969/new-respond', request_data)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }

                /**
                 * TODO: 
                 * Already responded + постоянное отображение
                 * 
                 */

                if (res.data === 'Already responded') {}

                if (res.data === 'Updated') {
                    set_responded(true)
                }

            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login')
                }
            })
    }

    return {job_offer_data, description, show_edit, toggle_edit, jo_respond, responded}
}