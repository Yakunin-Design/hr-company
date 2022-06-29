import React from 'react'
import LkNav from '../components/LkNav'

import Footer from '../components/Footer'
import '../styles/utils/lk.css'

function FindWorkers(props) {
    return (
        <div className="lk">
            <LkNav page="find-workers" user_type={props.user.user_type} />
            <main className="lk__container">
                <div className="--page-container">
                    <h2>Find workers</h2>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default FindWorkers