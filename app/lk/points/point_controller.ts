import subway_stations from "@/components/std/Inputs/SubwayInput/subway_stations";
import axios from "axios";
import { useEffect, useState } from "react";

type jo_data = {
    _id: string
    point_id: string
    employer_id: string

    candidates: Array<string>
    candidate_count: number
    created: number

    specialty: string
    salary: { amount: string, period: string }
    
    citizenship: string
    description: string
    experience: string
    sex: string
    age: { from: string, to: string }


    status: string
    type: string

    schedule?: { weekends: string, weekdays: string }
    working_time?: { start: string, end: string }
    city?: string
}

type point = {
    _id: string
    address: string
    emp_id: string
    job_offers: Array<jo_data>
    subway: string
    workers: Array<Object | null>
} | null

export default function point_controller() {
    const [points, set_points] = useState();
    const [point, set_point] = useState<point>();

    const [form_data, set_form_data] = useState({
        city:"Санкт-Петербург",
        subway:"",
        address:"",
    })
    const [errors, set_errors] = useState<Array<string>>([]);

    useEffect(() => {
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }

        axios.get(`${process.env.API_ADDRESS}/get-points`, config)
        .then(res => {
            if (!res.data) {
                return console.log(res)
            }
            set_points(res.data)
        })
        .catch(e => {
            console.log(e.message)
        })
    }, [])


    function handle_change(event: any) {
        const {name, value} = event.target
        set_form_data(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function add_point() {
        const err = []

        if (form_data.address == '') {
            err.push('address')
        }

        if (form_data.city == '') {
            err.push('city')
        }

        if (subway_stations.indexOf(form_data.subway) === -1) {
            err.push('subway')
        }

        if (err.length != 0) {
            set_errors(err)
        } else {
            const config = {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
    
            axios.post (`${process.env.API_ADDRESS}/new-point`, form_data, config)
            .then(res => {
                if (!res.data) {
                    return console.log(res)
                }
                set_errors([])
                window.location.href="/lk/points";
            })
            .catch(e => {
                console.log(e.message)
            })
        }
    }

    function delete_point(id: string) {
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .post(`${process.env.API_ADDRESS}/delete-point`,{id: id},config)
            .then(res => {
                if (!res.data) { return console.log(res); }
                window.location.href="/lk/points";
            })
    }

    function get_point(point_id: string) {
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .post(
                `${process.env.API_ADDRESS}/get-point-data`,
                { id: point_id },
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log(res);
                }

                set_point(res.data)
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    return {points, point, form_data, errors, handle_change, add_point, delete_point, get_point};
}
