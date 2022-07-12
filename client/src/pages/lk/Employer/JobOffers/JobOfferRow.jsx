import React from 'react'

import Indicator from './Indicator'
import Subway from '../../../../components/Subway'

import DisplayJobOffer from '../../../../components/DisplayJobOffer'

function JobOfferRow(props) {

    const [full_job_offer, set_full_job_offer] = React.useState(false)

    function toggle_full_job_offer() {
        set_full_job_offer(prev => !prev)
    }

    const unixTimeNow = Math.floor(Date.now() / 1000)
    
    const timer = unixTimeNow - props.data.created
    const min = timer /60;
    const hour = timer / 60;

    let created
    if (Math.floor(hour /24) > 0) {

        created = 
            Math.floor(hour / 24) + ' Дня ' +
            Math.floor(hour % 24) + ' Часов'

    } else if (Math.floor(hour % 24) > 0) {

        created = 
            Math.floor(hour % 24) + ' Часов '+
            Math.floor(min % 60) + ' Минут'
        
    } else {

        created =
            Math.floor(min % 60) + ' Минут ' +
            Math.floor(timer % 60) + ' Секунд'
    }

    return (
        <>
        { full_job_offer && <DisplayJobOffer id={props.data.id} handle_click={toggle_full_job_offer} /> }

        <div className="card job-offer-row" onClick={toggle_full_job_offer}>
            <Indicator count={props.data.candidate_count} />
            <h3>{props.data.specialty}</h3>
            <div className="job-offer-row__address">
                <h3>{props.data.address}</h3>
                <Subway station={props.data.subway} />
            </div>
            <p>{created}</p>
        </div>
        </>
    )
}

export default JobOfferRow