import React from 'react'

import Experience from '../Experience'
import Review from '../Review'

import CloseIcon from '../../assets/svg/close-icon-white'

import './WorkerProfile.css'

function WorkerProfile(props) {

    console.log(props)

    const exp_data = {
        employer: "Макдональдс",
        title: "Чистильщик картошки",
        description: "Sint atque tenetur id. Natus eos et qui sequi. Culpa debitis voluptatum quo fugiat. ♥♥♥♥♥ sed labore ducimus nostrum consequuntur. Sint atque tenetur id. Natus eos et qui sequi. Culpa debitis voluptatum quo fugiat. Ratione sed labore ducimus nostrum consequuntur.",
        start_month: 12,
        start_year: 2000,
        end_month: "02",
        end_year: 2004
    }

    return (
        <div className="JobOffer-container">

            <CloseIcon handle_click={props.handle_click} />

            <div className="card JobOffer">
                <div className="JobOffer__header">
                    <div className="JobOffer__company-logo company-logo">
                        <div className="company-logo__image"></div>
                    </div>

                    <h2 className="--mt1 --cd">{props.data.full_name}</h2>
                    <button className="--primary-btn --mt2" onClick={() => console.log('bruh')}>Предложить работу</button>
                </div>
                <hr className='wp-hr' />

                <div className="wp-main">
                    <div className="JobOffer__description wp-main__description">

                        <div className="wp-main__specialty-container">
                            <h3>Специальность</h3>
                            <div className="wp-main__specialty">
                                <div className="wp-main__specialty-block"><p className='--cd --v2'>{props.data.specialty}</p></div>
                            </div>
                        </div>
                        
                        <div className="wp-main__working-info">
                            <div className="wp-main__working-type">
                                <h3 className="--mt2">Тип работы</h3>
                                <div className="--row">
                                    <div className="--icon-square"></div>
                                    <p>Полная занятость</p>
                                </div>
                            </div>
                            <div className="wp-main__documents">
                                <h3 className="--mt2">Документы</h3>
                                <div className='--row'>
                                    <div className="--icon-square"></div>
                                    <div className="--icon-square"></div>
                                    <div className="--icon-square"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wp-main__sidebar">
                        <div className="wp-main__sidebar-main">
                            <div className="--row">
                                <div className="--icon-square"></div>
                                <p>Статус</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square"></div>
                                <p>Гражданство</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square"></div>
                                <p>Полных лет</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square"></div>
                                <p>беговая</p>
                            </div>
                        </div>
                        <div className="wp-main__sidebar-price --cl">3000р - Смена</div>
                    </div>

                </div>
                <hr className='wp-hr' />
                <div className="JobOffer__experience">
                    <Experience data={exp_data} />
                </div>
                <hr className='wp-hr' />
                <div className="JobOffer__reviews">
                    <Review data />
                </div>

            </div>
        </div>
    )
}

export default WorkerProfile