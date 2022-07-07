import React from 'react'
import LkNav from '../../../../components/MainNav'

import Footer from '../../../../components/Footer'
import '../../../../styles/utils/lk.css'

function JobOffers(props) {

    return (
        <div className="lk">
            <LkNav page="job-offers" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2>Ваши вакансии</h2>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default JobOffers