import React from 'react'

import save_job_offer from './save_job_offer'
import update_job_offer from './update_job_offer'
import { job_offer_validation } from '../../functions/validations'

export default function EditJobOfferLogic(old_data) {

    const [job_offer_data, set_job_offer_data] = React.useState({
        specialty: old_data.specialty || '',
        address: old_data.address || '',
        subway: old_data.subway || '',
        salary: old_data.salary || {
            amount: '100',
            period: 'hour'
        },
        experience: old_data.experience || '0',
        schedule: old_data.schedule || {
            weekdays: '',
            weekends: '',
        },
        working_time: old_data.working_time || {
            start: '',
            end: '',
        },
        citizenship: old_data.citizenship || "other",
        sex: old_data.sex || 'any',
        age: old_data.age || {
            from: '',
            to: '',
        },
        description: old_data.description || ''
    })

    const [job_offer_changes, set_job_offer_changes] = React.useState([])
    const [errors, set_errors] = React.useState([])

    function handle_change(event) {
        const { name, value } = event.target

        if (name === 'amount') {
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
            set_job_offer_data(prev => {
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
        } else {
            set_job_offer_data(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }

        set_job_offer_changes(prev => prev.filter(edit => edit != name ))
        set_job_offer_changes(prev => [...prev, name])
    }

    function on_save(job_offer_data) {
        const {validation_errors, send_data} = job_offer_validation(job_offer_data)
        set_errors(validation_errors)

        if (validation_errors.length === 0) {
            save_job_offer(send_data)
        } else {
            window.scrollTo({ top: 80 })
        }
    }

    function on_update(id, job_offer_data) {

        const {validation_errors, send_data} = job_offer_validation(job_offer_data)

        if (validation_errors.length === 0) {

            let changed_data = {}

            job_offer_changes.forEach(change => {

                if (change === 'amount' || change === 'period') {
                    changed_data["salary"] = send_data["salary"]
                } else if (change === 'weekends' || change === 'weekdays') {
                    changed_data["schedule"] = send_data["schedule"]
                } else if (change === 'wt-start' || change === 'wt-end') {
                    changed_data["working_time"] = send_data["working_time"]
                } else if (change === 'age_from' || change === 'age_to') {
                    changed_data["age"] = send_data["age"]
                } else {
                    changed_data[change] = send_data[change]
                }
                
            })

            update_job_offer({
                id,
                changes: {...changed_data}
            })

        } else {
            window.scrollTo({ top: 80 })
        }

    }

    return {
        job_offer_data,
        handle_change,
        on_save,
        on_update,
        errors
    }
}
