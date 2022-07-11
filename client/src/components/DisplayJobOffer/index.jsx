import React from 'react'
import Subway from '../Subway'
import './DisplayJobOffer.css'
import time_span from '../../assets/svg/time_span.svg'
import WorkerCard from '../worker-card'
import CloseIcon from '../../assets/svg/close-icon-white'


function DisplayJobOffer ({props}) {

    const schedule_blocks = []
    if (props.schedule) {
        for(let i = 0; i < props.schedule.weekdays; i++) {
            schedule_blocks.push(<div className="schedule-block --weekdays"></div>)
        }
        for(let i = 0; i < props.schedule.weekends; i++) {
            schedule_blocks.push(<div className="schedule-block --weekends"></div>)
        }
    }

    const citizenships = []
    if (props.citizenships) {
        if (props.citizenships === 'ru') {
            citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
        }
        if (props.citizenships === 'bu/uk') {
            citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
            citizenships.push(<div className="info-block__citizenships-block">🇧🇾/🇺🇦</div>)
        }
        if (props.citizenships === 'sng') {
            citizenships.push(<div className="info-block__citizenships-block">СНГ</div>)
        }
        if (props.citizenships === 'other') {
            citizenships.push(<h3>Любое</h3>)
        }
    }
    return(
        <div className="JobOffer-container">

            <CloseIcon />

            <div className="card JobOffer">
                <div className="JobOffer__header">
                    <div className="JobOffer__company-logo company-logo">
                        <div className="company-logo__image"></div>
                    </div>

                    <h2 className="--mt1 --cd">{props.specialty}</h2>
                    <p className="JobOffer__company-info"><h4 className='JobOffer__company-name'>Макдональдс</h4> | <Subway station={props.subway} text_style="h4"/></p>
                    <button className="JobOffer__edit-btn --primary-btn --mt2">Редактировать</button>
                </div>
                <hr className='JobOffer_hr --top-hr'/>

                <div className="JobOffer__main">
                    <div className="JobOffer__description">

                        <h3>Обязанности</h3>
                        <p>Lorem ipsum dolor sit. <br/>
                        Ipsa nam nuror qui recusandae <br/>
                        exercitationemvoluptates doloremque sequi <br/>
                        eaque minim perferendis adipisci! <br/>
                        Vero, laboriosam.</p>

                        <h3>Требования</h3>
                        <p>Lorem iipisicing elit. <br/>
                        Ipsa nam nue error qui recusandae <br/>
                        exercitationem ratione corrupti voluptates doloremque sequi <br/>
                        eaque sci! <br/>
                        Vero, laboriosam.</p>

                        <h3>Условия</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                        Iequi <br/>
                        eaque min nostrum perferendis adipisci! <br/>
                        Vero, laboriosam.</p>
                    </div>

                    <div className="card JobOffer__info-block info-block">
                        {
                            props.schedule 
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
                            props.working_time 
                            &&
                            <>
                                <div className="info-block__wk-container">

                                    <div className="info-block__wk-block">
                                        <p>Начало</p>
                                        <h3>{props.working_time.start}</h3>
                                    </div>

                                    <img src={time_span} />

                                    <div className="info-block__wk-block">
                                        <p>Окончание</p>
                                        <h3>{props.working_time.end}</h3>
                                    </div>

                                </div>
                            </>
                        }
                        {
                            props.citizenships 
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
                            props.sex 
                            &&
                            <div className="info-block__sex">
                                {
                                    props.sex === 'male' 
                                    ?
                                    <>
                                        <div className="info-block__sex-block">man</div>
                                        <h4>Только мужчины</h4>
                                    </>
                                    :
                                    <>
                                        <div className="info-block__sex-block">girls</div>
                                        <h4>Только девушки</h4>
                                    </>
                                }
                            </div>
                        }
                        <div className='JobOffer__price'>
                            <h4 className='--cl'>{props.price.amount}₽ - {props.price.period}</h4>
                        </div>
                    </div>
                </div>
                <hr className='JobOffer_hr --bottom-hr'/>
                <div className='JobOffer__candidates'>
                    <h2 className='--cd --mt2'>Кандидаты</h2>
                    <div className='JobOffer__candidates_container'>
                        <WorkerCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayJobOffer