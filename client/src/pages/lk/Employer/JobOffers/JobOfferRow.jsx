import React from 'react'

import Indicator from './Indicator'
import Subway from '../../../../components/Subway'

function JobOfferRow({ props }) {
    return (
        <div className="card job-offer-row">
            <Indicator count={props.candidate_count} />
            <h3>{props.specialty}</h3>
            <div className="job-offer-row__address">
                <h3>{props.address}</h3>
                <Subway station={props.subway} />
            </div>
            <p>{props.creation_time}</p>
        </div>
    )
}

export default JobOfferRow