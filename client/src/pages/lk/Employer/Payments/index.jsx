import React from 'react'
import LkNav from '../../../../components/MainNav'

import Footer from '../../../../components/Footer'
import '../../../../styles/utils/lk.css'

function Payments(props) {

    return (
        <div className="lk">
            <LkNav page="payments" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2>Payments</h2>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default Payments