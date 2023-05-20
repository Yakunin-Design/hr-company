import axios from "axios";

export default function get_prev_data(form_data: any, set_old_data: any, jo_id: string) {
    const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .get(`${process.env.API_ADDRESS}/job-offers/${jo_id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                // if (res.data.contains) {
                //     set_responded(true);
                // }

                set_old_data({
                    ...form_data,
                    ...res.data.data
                });
            })
            .catch(e => {
                console.log(e);
            });
}