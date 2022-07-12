import React from 'react'

import Indicator from './Indicator'
import Subway from '../../../../../components/Subway'
import get_period from '../../../../../functions/get_period'

import DisplayJobOffer from '../../../../../components/DisplayJobOffer'
import './JobOfferRow.css'

function JobOfferRow(props) {

    const [full_job_offer, set_full_job_offer] = React.useState(false)
    function toggle_full_job_offer() {
        set_full_job_offer(prev => !prev)
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
            <p>{get_period(props.data.created)}</p>
        </div>
        </>
    )
}

export default JobOfferRow