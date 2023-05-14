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
                'http://localhost:6969/close-job-offer',
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
                'http://localhost:6969/activate-job-offer',
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

    return {close_job_offer, activate_job_offer}
}