import React from 'react'
import axios from 'axios'

import WorkerProfile from '../pages/lk/Worker/WorkerProfile'
import EmployerProfile from '../pages/lk/Employer/EmployerProfile'

function Profile(props) {

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.get('http://localhost:6969/profile', config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }

                props.set_user({
                    user_type: res.data.specialty ? 'worker' : 'employer',
                    user_data: res.data
                })
                localStorage.setItem('user_type', res.data.specialty ? 'worker' : 'employer')

            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login')
                }
            })

    }, [])

    return (
        <>
            {props.user.user_type === 'employer' && <EmployerProfile user={props.user} />}
            {props.user.user_type === 'worker' && <WorkerProfile user={props.user} />}
        </>
    )
}

// props.user.user_data.specialty ? 'worker' : 'employer'

export default Profile