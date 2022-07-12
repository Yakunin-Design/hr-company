import React from 'react';
import Subway from '../Subway'
import './JobOfferCard.css'
import time_span from '../../assets/svg/time_span.svg'

function JobOfferCard (props) {

    const schedule_blocks = []
    if (props.data.schedule) {
        for(let i = 0; i < props.data.schedule.weekdays; i++) {
            schedule_blocks.push(<div className="schedule-block --weekdays"></div>)
        }
        for(let i = 0; i < props.data.schedule.weekends; i++) {
            schedule_blocks.push(<div className="schedule-block --weekends"></div>)
        }
    }
    
    return (
        <div className="card JobOfferCard">
            <div className="JobOfferCard__place">
                <div className="JobOfferCard__company">
                    <div className="JobOfferCard__company-logo"></div>
                    <h4>Макдональдс</h4>
                </div>
                <Subway station={props.data.subway} text_style="h4" />
            </div>
            <h3 className="JobOfferCard__title">{props.data.specialty}</h3>
                {
                    props.data.schedule 
                    ?
                    <div className="JobOfferCard__schedule --mt2">
                        <h4>График работы</h4>
                        <div className="JobOfferCard__schedule-container">
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
                    props.data.working_time 
                    &&
                    <>
                        <div className="JobOfferCard__wk-container --mt1">
                            <div className="JobOfferCard__wk-block">
                                <p>Начало</p>
                                <h3>{props.data.working_time.start}</h3>
                            </div>
                            <img src={time_span} />
                            <div className="JobOfferCard__wk-block">
                                <p>Окончание</p>
                                <h3>{props.data.working_time.end}</h3>
                            </div>
                        </div>
                    </>
                }
                <hr/>
                <h3 className='JobOfferCard__price'>{props.data.salary.amount}₽ - {props.data.salary.period}</h3>
            </div>
    )
}

export default JobOfferCard