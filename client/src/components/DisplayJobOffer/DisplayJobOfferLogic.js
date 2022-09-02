import React from 'react';

import axios from 'axios';
import description_dipslay from './description_display';

export default function DisplayJobOfferLogic(props) {
    const [job_offer_data, set_job_offer_data] = React.useState({
        schedule: {
            weekdays: 0,
            weekends: 0,
        },
        citizenships: 'any',
        specialty: '',
        subway: '',
        company: '',
        description: '',
        working_time: {
            start: '00:00',
            end: '00:00',
        },
        sex: '',
        salary: {
            period: 'hour',
            amount: '',
        },
    });

    const [show_edit, set_show_edit] = React.useState(false);
    const [responded, set_responded] = React.useState('');
    const [workers, set_workers] = React.useState([]);
    const [candidates, set_candidates] = React.useState([]);

    // props.id
    function toggle_edit() {
        set_show_edit(prev => !prev);
    }

    let description = description_dipslay(job_offer_data.description);

    // Getting full job offer
    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .get(`http://localhost:6969/job-offers/${props.id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                if (res.data.contains) {
                    set_responded('already');
                }

                set_job_offer_data(res.data.data);
                get_candidates(res.data.data.candidates);
                res.data.data.workers && get_workers(res.data.data.workers);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const jwt = localStorage.getItem('jwt') || '';

    const config = {
        headers: {
            authorization: 'Bearer ' + jwt,
        },
    };

    function get_candidates(candidates) {
        if (localStorage.getItem('user_type') === 'employer') {
            // getting candidates
            // [id, id, id] -> req -> [{}, {}, {}]
            axios
                .post(
                    'http://localhost:6969/get-candidates',
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

    function get_workers(workers) {
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

    function jo_respond() {
        axios
            .get(`http://localhost:6969/find-user`, config)
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

    function add_respond(worker_id) {
        const request_data = {
            worker_id,
            job_offer_id: props.id,
        };

        axios
            .post('http://localhost:6969/new-respond', request_data)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                if (res.data === 'Updated') {
                    set_responded('ok');
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login');
                }
                console.log(e.response);
                if (e.response.data === 'already_responded') {
                    set_responded('already');
                }
            });
    }

    const user_type = localStorage.getItem('user_type') || '';

    function close_job_offer() {
        axios
            .post(
                'http://localhost:6969/close-job-offer',
                { id: props.id },
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
        axios
            .post(
                'http://localhost:6969/activate-job-offer',
                { id: props.id },
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

    return {
        job_offer_data,
        description,
        show_edit,
        toggle_edit,
        jo_respond,
        responded,
        user_type,
        workers,
        candidates,
        close_job_offer,
        activate_job_offer,
    };
}
