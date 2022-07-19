import React from 'react'

import Experience from '../Experience'
import Review from '../Review'
import Subway from '../Subway'

import CloseIcon from '../../assets/svg/close-icon-white'
import ready from '../../assets/svg/ready.svg'

import './WorkerProfile.css'

function WorkerProfile(props) {

    console.log(props)

    const exp_data1 = {
        employer: "Макдональдс",
        title: "Чистильщик картошки",
        description: "Sint atque tenetur id. Natus eos et qui sequi. Culpa debitis voluptatum quo fugiat. ♥♥♥♥♥ sed labore ducimus nostrum consequuntur. Sint atque tenetur id. Natus eos et qui sequi. Culpa debitis voluptatum quo fugiat. Ratione sed labore ducimus nostrum consequuntur.",
        start_month: 12,
        start_year: 2000,
        end_month: "02",
        end_year: 2004
    }

    const exp_data2 = {
        employer: "Lou Lou",
        title: "Администратор",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis lectus nec lectus maximus consequat. Nunc quis eros dui. Quisque.",
        start_month: "04",
        start_year: 2004,
        end_month: 10,
        end_year: 2020
    }

    const review_data1 = {
        full_name: "Макдональдс",
        time: "15.02.2004",
        grades: [
            {
                name: 'Ответственность',
                grade: 4.9
            },
            {
                name: 'Исполнительность',
                grade: 4.5
            }
        ]
    }

    const review_data2 = {
        full_name: "Lou Lou",
        time: "01.11.2020",
        grades: [
            {
                name: 'Пунктуальность',
                grade: 5
            },
            {
                name: 'Внимательность',
                grade: 4.1
            },
            {
                name: 'Вежливость',
                grade: 3.9
            }
        ]
    }

    const citizenship = props.data.citizenship === 'other' ? 'другое' : props.data.citizenship === 'sng' ? 'СНГ' : props.data.citizenship === 'bu/ua' ? '🇧🇾/🇺🇦' : '🇷🇺'
    const birthday = (new Date()).getFullYear() - props.data.birthday.substr(6,4)
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
                                    <div className="--icon-square"><h3 className="--cd">П</h3></div>
                                    <p>Полная занятость</p>
                                </div>
                            </div>
                            <div className="wp-main__documents">
                                <h3 className="--mt2">Документы</h3>
                                <div className='--row'>
                                    <div className="--icon-square"><h3 className="--cd">П</h3></div>
                                    <div className="--icon-square"><h3 className="--cd">T</h3></div>
                                    <div className="--icon-square"><h3 className="--cd">Qr</h3></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wp-main__sidebar">
                        <div className="wp-main__sidebar-main">
                            <div className="--row">
                                <div className="--icon-square"><img src={ready}/></div>
                                <p>Статус</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square --citizenship-isq">{citizenship}</div>
                                <p>Гражданство</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square">{birthday}</div>
                                <p>Полных лет</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square"><Subway station={'Беговая'}/></div>
                                <p>Беговая</p>
                            </div>
                        </div>
                        <div className="wp-main__sidebar-price --cl">3000р - Смена</div>
                    </div>

                </div>
                <hr className='wp-hr' />
                <div className="JobOffer__experience">
                    <Experience data={exp_data1} />
                    <Experience data={exp_data2} />
                </div>
                <hr className='wp-hr' />
                <div className="JobOffer__reviews">
                    <Review data = {review_data1} />
                    <Review data = {review_data2}/>
                </div>

            </div>
        </div>
    )
}

export default WorkerProfile