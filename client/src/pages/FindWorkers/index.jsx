import React from 'react'
import LkNav from '../../components/MainNav'

import Footer from '../../components/Footer'
import '../../styles/utils/lk.css'
import './FindWorkers.css'
import WorkerCard from '../../components/WorkerCard'
import axios from 'axios'

function FindWorkers(props) {

    const [workers, set_workers] = React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:6969/find-workers')
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }

            set_workers(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const workers_list = workers.map(worker => <WorkerCard key={worker._id} data={worker} /> )

    return (
        <div className="lk">
            <LkNav page="find-workers" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2>Find Workers</h2>
                    <div className="find-workers">
                        {workers_list}
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default FindWorkers