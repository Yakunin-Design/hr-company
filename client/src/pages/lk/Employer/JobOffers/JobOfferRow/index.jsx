import React from 'react'

import Indicator from './Indicator'
import Subway from '../../../../../components/Subway'
import get_created_time from '../../../../../functions/get_created_time'

import clock from '../../../../../assets/svg/clock.svg'

import DisplayJobOffer from '../../../../../components/DisplayJobOffer'
import './JobOfferRow.css'

function JobOfferRow(props) {

    const [full_job_offer, set_full_job_offer] = React.useState(false)
    function toggle_full_job_offer() {
        window.scrollTo({ top: 0 })
        set_full_job_offer(prev => !prev)
    }

    return (
        <>
        { full_job_offer && <DisplayJobOffer id={props.data.id} handle_click={toggle_full_job_offer} /> }

        <div className="job-offer-row card" onClick={toggle_full_job_offer}>
            <div className="job-offer-row__important">
                <h3 className="job-offer-row__title">{props.data.specialty}</h3>
                <Indicator count={props.data.candidate_count} />
            </div>

            <div className="job-offer-row__address">
                <h3>{props.data.address}</h3>
                <Subway station={props.data.subway} />
            </div>

                <div className="job-offer-row__time-created">
                    <img src={clock} alt="clock icon" />
                    <p>{get_created_time(props.data.created)}</p>
                </div>
        </div>
        </>
    )
}

export default JobOfferRow