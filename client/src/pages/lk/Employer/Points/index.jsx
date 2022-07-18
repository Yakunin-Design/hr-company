import React from 'react'
import LkNav from '../../../../components/MainNav'

import Footer from '../../../../components/Footer'
import '../../../../styles/utils/lk.css'

function Points(props) {

    return (
        <div className="lk">
            <LkNav page="points" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2>Points</h2>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default Points