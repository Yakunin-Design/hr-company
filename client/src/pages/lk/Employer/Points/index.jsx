import React from 'react'

import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import PointList from './PointList'
import DisplayPoint from './DisplayPoint'

import '../../../../styles/utils/lk.css'

function Points(props) {

    const [poinst_data, set_points_data] = React.useState([])

    const dummy_data = [{
        id: 'bruh',
        subway: 'Адмиралтейская',
        address: 'Улица Ленина',
        job_offers: [
            {specialty: 'Повар'},
            {specialty: 'Повар2'}
        ],
        workers: [
            {full_name: 'Азамат'},
            {full_name: 'Азалупа'}
        ]
    }]

    const [display_point, set_display_point] = React.useState({})

    console.log(display_point)

    return (
        <div className="lk">
            <LkNav page="points" user_type={props.user.user_type} />
            <main className="lk__container">
        
                { Object.keys(display_point).length != 0
                    ? <DisplayPoint set_display_point={set_display_point} data={display_point}/>
                    : <PointList data={dummy_data} set_display_point={set_display_point}/>
                }

                <Footer />
            </main>
        </div>
    )
}

export default Points