import React from 'react'
import axios from 'axios'

import WorkerAccount from '../pages/lk/Worker/WorkerAccount'
import EmployerAccount from '../pages/lk/Employer/EmployerAccount'

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
            {props.user.user_type === 'employer' && <EmployerAccount user={props.user} />}
            {props.user.user_type === 'worker' && <WorkerAccount user={props.user} />}
        </>
    )
}

export default Profile