import axios from 'axios'

export default function save_job_offer(job_offer_data, errors, set_errors, stations) {

    set_errors([])

    let send_data = {}
    //default
    send_data.type = 'full_time'
    send_data.salary = job_offer_data.salary
    send_data.experience = job_offer_data.experience
    send_data.citizenship = job_offer_data.citizenship
    send_data.sex = job_offer_data.sex

    //required
    job_offer_data.specialty === '' ? set_errors(prev => {return [...prev, 'specialty']}) : send_data.specialty = job_offer_data.specialty
    job_offer_data.address === '' ? set_errors(prev => {return [...prev, 'address']}) : send_data.address = job_offer_data.address
    stations.indexOf(job_offer_data.subway) === -1 ? set_errors(prev => {return [...prev, 'subway']}) : send_data.subway = job_offer_data.subway

    //main
    if (job_offer_data.working_time.start != '' && job_offer_data.working_time.end === '') {
        set_errors(prev => {return [...prev, 'wt-end']})
    } else if (job_offer_data.working_time.start === '' && job_offer_data.working_time.end != '') {
        set_errors(prev => {return [...prev, 'wt-start']})
    } else if (job_offer_data.working_time.start && job_offer_data.working_time.end != '') {
        send_data.working_time = job_offer_data.working_time
    } 

    if (job_offer_data.schedule.weekdays != '' && job_offer_data.schedule.weekends === '') {
        set_errors(prev => {return [...prev, 'weekdays']})
    } else if (job_offer_data.schedule.weekdays === '' && job_offer_data.schedule.weekends != '') {
        set_errors(prev => {return [...prev, 'weekends']})
    } else if (job_offer_data.schedule.weekdays != '' && job_offer_data.schedule.weekends != '') {
        send_data.schedule = job_offer_data.schedule
    }

    //advanced
    if (!isNaN(job_offer_data.age.from) || !isNaN(job_offer_data.age.to != '')) {
        send_data.age = job_offer_data.age
    } else if (!isNaN(job_offer_data.age.from) && job_offer_data.age.from != '') {
        set_errors(prev => {return [...prev, 'age_from']})
    } else if (!isNaN(job_offer_data.age.to) && job_offer_data.age.to != ''){
        set_errors(prev => {return [...prev, 'age_to']})
    }
    if (job_offer_data.description != '') send_data.description = job_offer_data.description

    if (errors.length === 0) {
        //request
        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.post('http://localhost:6969/new-job-offer', send_data, config)
        .then(res => document.location.reload())
        .catch(e => console.log(e))

    } else {
        window.scrollTo({ top: 80 })
    }
    

    console.log(send_data);
}