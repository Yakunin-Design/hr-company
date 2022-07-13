import React from 'react'

import InfoBlockLogic from './InfoBlockLogic'
import Subway from '../../Subway'

import time_span from '../../../assets/svg/time_span.svg'
import mark_filled from '../../../assets/svg/mark_filled.svg'
import man from '../../../assets/svg/man.svg'
import woman from '../../../assets/svg/woman.svg'

export default function InfoBlock({job_offer_data}) {

    const { schedule_blocks, citizenships } = InfoBlockLogic(job_offer_data)
    const salary_period = job_offer_data.salary.period === 'hour' ? 'час' : job_offer_data.salary.period === 'month' ? 'месяц' : 'смена'

    return (

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

    )
}