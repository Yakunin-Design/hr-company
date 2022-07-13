import React from 'react'

export default function EditJobOfferLogic() {

    const [job_offer_data, set_job_offer_data] = React.useState({
        specialty: '',
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
        description: ''
    })

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
                            amount: value === 'day' ? 500 : value === 'month' ? 15000 : 100,
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
    }

    return {
        job_offer_data,
        handle_change
    }
}