import axios from 'axios'

export default function save_job_offer(job_offer_data) {

    const jwt = localStorage.getItem('jwt') || ''

    const config = {
        headers: {
            authorization: 'Bearer ' + jwt
        }
    }

    const n_regex = new RegExp('\n', 'g')
    const request_data = {
        ...job_offer_data,
        type: 'full time'
    }

    if (request_data.working_time.start === '' || request_data.working_time.end === '') {
        delete request_data.working_time
    }

    if (request_data.schedule.weekdays === '' && request_data.schedule.weekends === '') {
        delete request_data.schedule
    }

    axios.post('http://localhost:6969/new-job-offer', request_data, config)
        .then(res => document.location.reload())
        .catch(e => console.log(e))

}