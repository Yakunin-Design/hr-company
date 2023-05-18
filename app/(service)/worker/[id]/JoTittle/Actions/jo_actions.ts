import axios from "axios";

export default function jo_actions({id}: {id: string}) {
    
    function close_job_offer() {

        const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/close-job-offer`,
                { id: id },
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    function activate_job_offer() {

        const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/activate-job-offer`,
                { id: id },
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    function jo_respond() {

        const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .get(`${process.env.API_ADDRESS}/find-user`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                if (res.data.user_type === 'worker') {
                    add_respond(res.data.id);
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login');
                }
            });
    }

    function add_respond(worker_id: string) {
        const request_data = {
            worker_id,
            job_offer_id: id,
        };

        axios
            .post(`${process.env.API_ADDRESS}/new-respond`, request_data)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }
                window.location.reload();
            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login');
                }
                console.log(e.response);
            });
    }

    return {close_job_offer, activate_job_offer, jo_respond}
}