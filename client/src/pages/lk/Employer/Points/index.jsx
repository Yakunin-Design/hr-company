import React from 'react'
import axios from 'axios'

import LkNav from '../../../../components/MainNav'
import Footer from '../../../../components/Footer'

import PointList from './PointList'
import DisplayPoint from './DisplayPoint'

import '../../../../styles/utils/lk.css'

function Points(props) {
    const [points_list, set_points_list] = React.useState([])

    React.useEffect(() => {

        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }

        axios.get('http://localhost:6969/get-points', config)
        .then(res => {
            if (!res.data) {
                return console.log(res)
            }
            set_points_list(res.data)
        })
        .catch(e => {
            console.log(e.message)
        })

    },[])

    const [display_point, set_display_point] = React.useState({})

    return (
        <div className="lk">
            <LkNav page="points" user_type={props.user.user_type} />
            <main className="lk__container">
        
                { Object.keys(display_point).length != 0
                    ? <DisplayPoint set_display_point={set_display_point} data={display_point}/>
                    : <PointList data={points_list} set_display_point={set_display_point}/>
                }

                <Footer />
            </main>
        </div>
    )
}

export default Points