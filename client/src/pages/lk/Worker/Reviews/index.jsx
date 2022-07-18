import React from 'react'
import LkNav from '../../../../components/MainNav'

import Footer from '../../../../components/Footer'
import '../../../../styles/utils/lk.css'

function Reviews(props) {

    return (
        <div className="lk">
            <LkNav page="reviews" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2>Reviews</h2>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default Reviews