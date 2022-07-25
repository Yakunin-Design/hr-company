import React from 'react'

import Subway from '../../../../../../components/Subway'

import './PointCard.css'

function PointCard(props) {
    return (
        <>
            <div className="job-offer-row card" onClick={() => {props.set_display_point(props.data)}}>
                <div className="job-offer-row__address">
                    <h3>{props.data.address}</h3>
                    <Subway station={props.data.subway} />
                </div>
                <div className="--mla --row">
                    <p className="--v2">{props.data.job_offers.length} вакансии</p>
                    <p className="--v2 --ml2">{props.data.workers.length} сотрудника</p>
                </div>
            </div>
        </>
    )
}

export default PointCard