import axios from "axios";
import { useEffect, useState } from "react";
import get_workers from "./controller_functions/get_workers";
import get_candidates from "./controller_functions/get_candidates";

export default function job_offers_controller(id: string) {
    const [jo_data, set_jo_data] = useState({
        _id: "",
        address: "",
        age: {
            from: "", 
            to: "" 
        },
        avatar: "",
        candidate_count: 0,
        candidates: [],
        citizenship: "",
        city: "",
        company: "",
        created: 0,
        description: "",
        employer_id: "",
        experience: "",
        salary: { amount: "", period: "" },
        schedule: { weekends: "", weekdays: "" },
        sex: "any",
        specialty: "",
        status: "",
        subway: "",
        type: "",
        working_time: { start: "", end: "" }
    })
    
    const [responded, set_responded] = useState(false)
    const [candidates, set_candidates] = useState()
    const [workers, set_workers] = useState()
    const [user_type, set_user_type] = useState({
        type: "",
    })

    useEffect(() => {
        const jwt = localStorage.getItem('jwt') || '';

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt,
            },
        };

        axios
            .get(`http://localhost:6969/job-offers/${id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                // if (res.data.contains) {
                //     set_responded(true);
                // }

                set_jo_data(res.data.data);
                get_candidates(res.data.data.candidates, set_candidates);
                res.data.data.workers && get_workers(res.data.data.workers, set_workers);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return {jo_data, candidates, workers, user_type}
}