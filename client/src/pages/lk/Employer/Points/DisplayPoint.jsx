import React from 'react'

import back_arrow_icon from '../../../../assets/svg/back-arrow.svg'
import Subway from '../../../../components/Subway'

import '../../../../styles/utils/lk.css'

function DisplayPoint(props) {
    return (
        <div className="--page-container --page-content">
            
            <button className="--floating-btn --mt2" onClick={() => props.set_display_point({})}><img src={back_arrow_icon} alt="back-btn"/></button>
            <h2 className="--mt2 --mb1">{props.data.address}</h2>
            <Subway station={props.data.subway} text_style="h3"/>
        </div>
    )
}

export default DisplayPoint