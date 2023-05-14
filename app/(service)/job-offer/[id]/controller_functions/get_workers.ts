import axios from "axios";

export default function get_workers(workers: any, set_workers: any) {

    const jwt = localStorage.getItem('jwt') || '';

    const config = {
        headers: {
            authorization: 'Bearer ' + jwt,
        },
    };

    if (localStorage.getItem('user_type') === 'employer') {
        axios
            .post(
                'http://localhost:6969/get-workers',
                workers,
                config
            )
            .then(res => {
                set_workers(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
}