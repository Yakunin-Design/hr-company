import subway_stations from "@/components/std/Inputs/SubwayInput/subway_stations";
import axios from "axios";
import { useEffect, useState } from "react";
import { job_offer_validation } from "@/functions/validation";
import get_prev_data from "./edit/[id]/get_prev_data";

type form_data = {
    specialty: string,
    city: string,
    address: string,
    subway: string,
    salary: {
        amount: string,
        period: string
    },
    experience: string,
    schedule: {
        weekdays: string,
        weekends: string,
    },
    working_time: {
        start: string,
        end: string,
    },
    citizenship: string,
    sex: string,
    age: {
        from: string,
        to: string,
    },
    description: string
}

type point = {
    _id: string
    address: string
    emp_id: string
    job_offers: Array<Object | null>
    subway: string
    workers: Array<Object | null>
}

export default function job_offer_controller(jo_id?: string) {

    const [min_job_offers, set_min_job_offers] = useState([])
    const [points, set_points] = useState<Array<point>>([])
    const [form_data, set_form_data] = useState({
        specialty: '',
        city: "Санкт-Петербург",
        address: '',
        subway: '',
        salary: {
            amount: '100',
            period: 'hour'
        },
        experience: '0',
        schedule: {
            weekdays: '',
            weekends: '',
        },
        working_time: {
            start: '',
            end: '',
        },
        citizenship: "other",
        sex: 'any',
        age: {
            from: '',
            to: '',
        },
        description: "Обязанности: \n  -\n  -\nТребования:\n   -\n   -\nУсловия:\n   -\n   -"
    })
    const [errors, set_errors] = useState<Array<string>>([]);
    const [changes, set_changes] = useState<Array<string>>([]);

    // getting min job_offers
    useEffect(() => {
        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.get('http://localhost:6969/job-offers', config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }
                set_min_job_offers(res.data.job_offers)
                set_points(res.data.points)
            })
            .catch(e => {
                console.log(e)
            })

        jo_id && get_prev_data(set_form_data, jo_id);

    }, [])

    function handle_change(event: any) {
        const { name, value } = event.target

        if (name === 'amount') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        salary: {
                            amount: value,
                            period: prev.salary.period
                        }
                    }
                )
            })

        } else if (name === 'period') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        salary: {
                            amount: prev.salary.amount,
                            period: value
                        }
                    }
                ) 
            })

        } else if (name === 'weekends') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        schedule: {
                            weekends: value,
                            weekdays: prev.schedule.weekdays
                        }
                    }
                )
                
            })
        } else if (name === 'weekdays') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        schedule: {
                            weekdays: value,
                            weekends: prev.schedule.weekends
                        }
                    }
                )
            })
        } else if (name === 'wt-start') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        working_time: {
                            start: value.lenght === 2 ? value + ":00" : value,
                            end: prev.working_time.end
                        }
                    }
                )
                
            })
        } else if (name === 'wt-end') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        working_time: {
                            start: prev.working_time.start,
                            end: value.lenght === 2 ? value + ":00" : value
                        }
                    }
                )
                
            })
        } else if (name === 'age_from') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        age: {
                            from: value,
                            to: prev.age.to
                        }
                    }
                )
                
            })
        } else if (name === 'age_to') {
            set_form_data(prev => {
                return (
                    {
                        ...prev,
                        age: {
                            from: prev.age.from,
                            to: value
                        }
                    }
                )
                
            })
        } else if (name === 'address') {

            for(let i = 0; i < points.length; i++) {
                if (points[i].address === value) {
                    set_form_data(prev => {
                        return {
                            ...prev,
                            [name]: value,
                            'subway': points[i].subway
                        }
                    })
                    return
                }
            }

            set_form_data(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        } else {
            set_form_data(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }

        if (name === 'address') {
            set_changes(prev => prev.filter(edit => (edit != name && edit != 'subway') ))
            set_changes(prev => [...prev, name, 'subway'])
        } else {
            set_changes(prev => prev.filter(edit => edit != name ))
            set_changes(prev => [...prev, name])
        }

        
    }

    function create_jo() {
        const {validation_errors, send_data} = job_offer_validation(form_data)
        set_errors(validation_errors)

        let data_to_api = send_data

        for(let i = 0; i < points.length; i++) {
            if (points[i].address === send_data.address && points[i].subway === send_data.subway) {
                delete data_to_api.city
                delete data_to_api.address
                delete data_to_api.subway
                //@ts-ignore
                data_to_api["point_id"] = points[i]._id
            }
        }

        if (validation_errors.length === 0) {
            const jwt = localStorage.getItem('jwt') || ''

            const config = {
                headers: {
                    authorization: 'Bearer ' + jwt
                }
            }

            axios.post('http://localhost:6969/new-job-offer', send_data, config)
                .then(res => window.location.href="/lk/job-offers")
                .catch(e => console.log(e))
                } else {
                    window.scrollTo({ top: 80 })
                }
    }

    function update_jo() {

        const {validation_errors, send_data} = job_offer_validation(form_data)

        if (validation_errors.length === 0) {

            let changed_data: any = {}

            changes.forEach(change => {

                if (change === 'amount' || change === 'period') {
                    changed_data["salary"] = send_data["salary"]
                } else if (change === 'weekends' || change === 'weekdays') {
                    changed_data["schedule"] = send_data["schedule"]
                } else if (change === 'wt-start' || change === 'wt-end') {
                    changed_data["working_time"] = send_data["working_time"]
                } else if (change === 'age_from' || change === 'age_to') {
                    changed_data["age"] = send_data["age"]
                } else {
                    //@ts-ignore
                    changed_data[change] = send_data[change]
                }
                
            })

            const jwt = localStorage.getItem('jwt') || ''

            const config = {
                headers: {
                    authorization: 'Bearer ' + jwt
                }
            }

            const req = {
                id: jo_id,
                changes: changed_data
            }

            axios.post('http://localhost:6969/edit-job-offer', req, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }
                document.location.href = "/lk/job-offers"

            })
            .catch(e => {
                if (e.response.status === 401) {
                    window.location.replace('/login')
                }
            })

        } else {
            window.scrollTo({ top: 80 })
        }

    }
    return {min_job_offers, points, form_data, errors, handle_change, create_jo, update_jo};
}
