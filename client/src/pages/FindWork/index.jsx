import React from 'react'
import LkNav from '../../components/MainNav'

import Footer from '../../components/Footer'
import '../../styles/utils/lk.css'

function FindWork(props) {

    return (
        <div className="lk">
            <LkNav page="findwork" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2>FindWork</h2>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default FindWork