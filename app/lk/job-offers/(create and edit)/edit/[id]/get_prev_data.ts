import axios from "axios";

export default function get_prev_data(set_old_data: any, jo_id: string) {
    const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .get(`http://localhost:6969/job-offers/${jo_id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                // if (res.data.contains) {
                //     set_responded(true);
                // }

                set_old_data(res.data.data);
            })
            .catch(e => {
                console.log(e);
            });
}