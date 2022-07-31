import React, { useEffect } from 'react'
import LkNav from '../../../../components/MainNav'

import Footer from '../../../../components/Footer'
import '../../../../styles/utils/lk.css'

function WorkerBank(props) {

    const [candidates, set_candidates] = React.useState([])

    useEffect(() => {
        
    }, [])

    return (
        <div className="lk">
            <LkNav page="worker-bank" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2>Кандидаты</h2>

                </div>
                <Footer />
            </main>
        </div>
    )
}

export default WorkerBank