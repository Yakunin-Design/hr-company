import axios from "axios";

export default function get_candidates(candidates: any, set_candidates: any) {
    if (localStorage.getItem('user_type') === 'employer') {
        // getting candidates
        // [id, id, id] -> req -> [{}, {}, {}]

        const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/get-candidates`,
                candidates,
                config
            )
            .then(res => {
                set_candidates(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
}