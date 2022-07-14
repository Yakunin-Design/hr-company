import axios from 'axios'

export default function save_job_offer(send_data) {

    const jwt = localStorage.getItem('jwt') || ''

    const config = {
        headers: {
            authorization: 'Bearer ' + jwt
        }
    }

    axios.post('http://localhost:6969/new-job-offer', send_data, config)
        .then(res => document.location.reload())
        .catch(e => console.log(e))
    
    console.log(send_data);
}