import React from 'react'

export default function useToggle() {
    const [new_job_offer, set_new_job_offer] = React.useState(false) 

    function toggle_new_job_offer() {
        set_new_job_offer(prev => !prev)
    }

    return {new_job_offer, toggle_new_job_offer}
}