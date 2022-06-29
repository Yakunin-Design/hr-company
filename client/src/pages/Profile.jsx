import React from 'react'
import axios from 'axios'

import WorkerProfile from './WorkerProfile'
import EmployerProfile from './EmployerProfile'

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

            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login')
                }
            })

    }, [])

    return (
        props.user.user_data.specialty
            ? <WorkerProfile user={props.user} />
            : <EmployerProfile user={props.user} />
    )
}

export default Profile