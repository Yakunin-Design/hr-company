import React from 'react'
import LkNav from '../../../../components/MainNav'
import axios from 'axios'

import Footer from '../../../../components/Footer'
import JobOfferCard from '../../../../components/JobOfferCard'
import '../../../../styles/utils/lk.css'

function MyJob(props) {

    const [job_offers, set_job_offers] = React.useState({})

    const jwt = localStorage.getItem('jwt') || ''

    const config = {
        headers: {
            authorization: 'Bearer ' + jwt
        }
    }

    React.useEffect(() => {
        axios.get('http://localhost:6969/my-job', config)
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

    console.log(job_offers);

    return (
        <div className="lk">
            <LkNav page="myjob" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2 className='--mt2'>Моя работа</h2>
                    {
                        (job_offers.my_job && job_offers.my_job.lenght > 0)
                        ?
                        job_offers.my_job.map(job => {
                            return <JobOfferCard data={job} key={job._id} id={job._id}/>
                        })
                        :
                        <h3 className='--mt2'>Активные вакансии отсутствуют</h3>
                    }
                    <h2 className='--mt2'>Отклики</h2>
                    {
                        (job_offers.responds && job_offers.responds != [])
                        ?
                        job_offers.responds.map(resp => {
                            return <JobOfferCard data={resp} key={resp._id} id={resp._id}/>
                        })
                        :
                        <h3 className='--mt2'>Вакансии на которые вы откликнулись будут отображаться здесь</h3>
                    }
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default MyJob