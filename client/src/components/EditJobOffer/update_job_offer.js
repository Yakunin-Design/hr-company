import axios from 'axios'

export default function update_job_offer(changed_data) {

    const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

    axios.post('http://localhost:6969/edit-job-offer', changed_data, config)
    .then(res => {
        if (!res.data) {
            return console.log('bruh')
        }

    })
    .catch(e => {
        if (e.response.status === 401) {
            window.location.replace('/login')
        }
    })
}