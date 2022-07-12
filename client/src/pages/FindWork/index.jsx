import React from 'react'
import LkNav from '../../components/MainNav'

import Footer from '../../components/Footer'
import '../../styles/utils/lk.css'
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
        console.log(jo._id)

        return <JobOfferCard key={jo._id} data={jo} />
    })

    return (
        <div className="lk">
            <LkNav page="findwork" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2>FindWork</h2>
                    {job_offers_list}
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default FindWork