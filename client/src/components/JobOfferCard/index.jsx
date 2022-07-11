import React from 'react';
import Subway from '../Subway'
import './JobOfferCard.css'
import time_span from '../../assets/svg/time_span.svg'

function JobOfferCard ({props}) {

    const schedule_blocks = []
    if (props.schedule) {
        for(let i = 0; i < props.schedule.weekdays; i++) {
            schedule_blocks.push(<div className="schedule-block --weekdays"></div>)
        }
        for(let i = 0; i < props.schedule.weekends; i++) {
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
                <Subway station={props.subway} text_style="h4" />
            </div>
            <h3 className="JobOfferCard__title">{props.specialty}</h3>
                {
                    props.schedule 
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
                    props.working_time 
                    &&
                    <>
                        <div className="JobOfferCard__wk-container --mt1">
                            <div className="JobOfferCard__wk-block">
                                <p>Начало</p>
                                <h3>{props.working_time.start}</h3>
                            </div>
                            <img src={time_span} />
                            <div className="JobOfferCard__wk-block">
                                <p>Окончание</p>
                                <h3>{props.working_time.end}</h3>
                            </div>
                        </div>
                    </>
                }
                <hr/>
                <h3 className='JobOfferCard__price'>{props.price.amount}₽ - {props.price.period}</h3>
            </div>
    )
}

export default JobOfferCard