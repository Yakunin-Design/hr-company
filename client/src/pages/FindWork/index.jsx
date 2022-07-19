import React from 'react'
import LkNav from '../../components/MainNav'

import Footer from '../../components/Footer'
import '../../styles/utils/lk.css'
import './FindWork.css'
import JobOfferCard from '../../components/JobOfferCard'
import axios from 'axios'

function FindWork(props) {
    const [job_offers, set_job_offers] = React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:6969/find-job')
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }

            set_job_offers(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const job_offers_list = job_offers.map(jo => {
        return <JobOfferCard key={jo._id} data={jo} id={jo._id}/>
    })

    return (
        <div className="lk">
            <LkNav page="findwork" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2>FindWork</h2>
                    <div className="job-offers-list">
                        {job_offers_list}
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default FindWork