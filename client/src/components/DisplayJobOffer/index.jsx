import React from 'react'

import Subway from '../Subway'
import WorkerCard from '../WorkerCard'

import get_period from '../../functions/get_created_time'

import './DisplayJobOffer.css'

import time_span from '../../assets/svg/time_span.svg'
import mark_filled from '../../assets/svg/mark_filled.svg'
import clock from '../../assets/svg/clock.svg'
import man from '../../assets/svg/man.svg'
import woman from '../../assets/svg/woman.svg'
import CloseIcon from '../../assets/svg/close-icon-white'

import axios from 'axios'

function DisplayJobOffer(props) {

    const [job_offer_data, set_job_offer_data] = React.useState({
        schedule: {
            weekdays: 0,
            weekends: 0
        },
        citizenships: 'any',
        specialty: '',
        subway: '',
        company: '',
        description: '',
        working_time: {
            start: '00:00',
            end: '00:00'
        },
        sex: '',
        salary: {
            period: 'hour',
            amount: ''
        }
    })

    const salary_period = job_offer_data.salary.period === 'hour' ? 'час' : job_offer_data.salary.period === 'month' ? 'месяц' : 'смена'

    // Getting full job offer
    React.useEffect(() => {

        const jwt = localStorage.getItem('jwt') || ''

        const config = {
            headers: {
                authorization: 'Bearer ' + jwt
            }
        }

        axios.get(`http://localhost:6969/job-offers/${props.id}`, config)
            .then(res => {
                if (!res.data) {
                    return console.log('bruh')
                }

                set_job_offer_data(res.data)
            })
            .catch(e => {
                console.log(e)
            })

    }, [])

    const schedule_blocks = []
    if (job_offer_data.schedule) {
        for(let i = 0; i < job_offer_data.schedule.weekdays; i++) {
            schedule_blocks.push(<div className="schedule-block --weekdays"></div>)
        }

        for(let i = 0; i < job_offer_data.schedule.weekends; i++) {
            schedule_blocks.push(<div className="schedule-block --weekends"></div>)
        }
    }

    const citizenships = []
    if (job_offer_data.citizenships) {
        if (job_offer_data.citizenships === 'ru') {
            citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
        }

        if (job_offer_data.citizenships === 'bu/uk') {
            citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
            citizenships.push(<div className="info-block__citizenships-block">🇧🇾/🇺🇦</div>)
        }

        if (job_offer_data.citizenships === 'sng') {
            citizenships.push(<div className="info-block__citizenships-block">СНГ</div>)
        }

        if (job_offer_data.citizenships === 'other') {
            citizenships.push(<h3>Любое</h3>)
        }
    }

    return(
        <div className="JobOffer-container">

            <CloseIcon handle_click={props.handle_click} />

            <div className="card JobOffer">
                <div className="JobOffer__header">
                    <div className="JobOffer__company-logo company-logo">
                        <div className="company-logo__image"></div>
                    </div>

                    <h2 className="--mt1 --cd">{job_offer_data.specialty}</h2>
                    <div className="JobOffer__company-info">
                        <h4 className="JobOffer__company-name">Макдональдс</h4>
                        <h4 className="JobOffer__separator">|</h4>
                        <div className="company-info__created">
                            <img src={clock} />
                            <h4>{get_period(job_offer_data.created)}</h4>
                        </div>
                    </div>
                    <button className="JobOffer__edit-btn --primary-btn --mt2">Редактировать</button>
                </div>
                <hr className='JobOffer_hr --top-hr'/>

                <div className="JobOffer__main">
                    <div className="JobOffer__description">{job_offer_data.description ? <p>{job_offer_data.description}</p> : <h3>Описание отсутствует</h3>}</div>
                    <div className="card JobOffer__info-block info-block">
                        <div className='info-block__address'>
                            <h4>Адрес</h4>
                            <Subway station={job_offer_data.subway} text_style="h4"/>
                            <div className='addres'>
                                <img src={mark_filled} alt="show on map" />
                                <h4>{job_offer_data.address}</h4>
                            </div>
                        </div>
                        {
                            job_offer_data.schedule 
                            ?
                            <div className="info-block__schedule">
                                <h4>График работы</h4>
                                <div className="info-block__schedule-container">
                                    {
                                        schedule_blocks.map(schedule_block => {
                                            return <>{schedule_block}</>
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <p className="--v2 --mt1">График работы договорной</p>
                        }
                        {
                            job_offer_data.working_time 
                            &&
                            <>
                                <div className="info-block__wk-container">

                                    <div className="info-block__wk-block">
                                        <p>Начало</p>
                                        <h3>{job_offer_data.working_time.start}</h3>
                                    </div>

                                    <img src={time_span} />

                                    <div className="info-block__wk-block">
                                        <p>Окончание</p>
                                        <h3>{job_offer_data.working_time.end}</h3>
                                    </div>

                                </div>
                            </>
                        }
                        {
                            job_offer_data.citizenships 
                            &&
                            <div className="info-block__citizenships">
                                {
                                    citizenships.map(citizenship => {
                                        return <>{citizenship}</>
                                    })
                                }
                                <h4>Гражданство</h4>
                            </div>

                        }
                        {
                            (job_offer_data.sex && job_offer_data.sex != 'any')
                            &&
                            <div className="info-block__sex">
                                {
                                    job_offer_data.sex === 'male' 
                                    ?
                                    <>
                                        <div className="info-block__sex-block"><img src={man}/></div>
                                        <h4>Только мужчины</h4>
                                    </>
                                    :
                                    <>
                                        <div className="info-block__sex-block"><img src={woman}/></div>
                                        <h4>Только девушки</h4>
                                    </>
                                }
                            </div>
                        }
                        <div className='JobOffer__price'>
                            <h4 className='--cl'>{job_offer_data.salary.amount}₽ - {salary_period}</h4>
                        </div>
                    </div>
                </div>
                <hr className='JobOffer_hr --bottom-hr'/>
                <div className='JobOffer__candidates'>
                    <h2 className='--cd --mt2'>Кандидаты</h2>
                    {
                        job_offer_data.candidate_count === []
                        ?
                        <div className='JobOffer__candidates_container'>
                            {/* <WorkerCard /> */}
                        </div>
                        :
                        <h3 className='--mt1 --cd'>Кандидаты отсутствуют</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default DisplayJobOffer