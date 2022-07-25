import React from 'react'

import EditPoint from './CreatePoint'
import PointCard from './PointCard'

function PointList(props) {

    const [edit_point, set_edit_point] = React.useState(false)

    function toggle_edit() {
        set_edit_point(prev => !prev)
    }

    const point_cards = props.data.map(point => <PointCard data={point} key={point.id} set_display_point={props.set_display_point}/>)

    return (
        <div className="--page-container --page-content">
            <div className="job-offers__heading">
                <h2 className="job-offers__title">Ваши точки</h2>
                <button className="job-offers__add --primary-btn" onClick={toggle_edit}>Создать точку</button>
            </div>

            {point_cards}

            {edit_point && <EditPoint create handle_click={toggle_edit} />}
        </div>
    )
}

export default PointList