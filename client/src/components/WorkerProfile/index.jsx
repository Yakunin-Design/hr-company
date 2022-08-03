import React from 'react'

import Experience from '../Experience'
import Review from '../Review'
import Subway from '../Subway'

import CloseIcon from '../../assets/svg/close-icon-white'
import ready from '../../assets/svg/ready.svg'

import './WorkerProfile.css'
import '../../styles/modal_sheet.css'

function WorkerProfile(props) {

    const citizenship = props.data.citizenship === 'other' ? 'другое' : props.data.citizenship === 'sng' ? 'СНГ' : props.data.citizenship === 'bu/ua' ? '🇧🇾/🇺🇦' : '🇷🇺'
    const birthday = (new Date()).getFullYear() - props.data.birthday.substr(6,4)

    return (
        <div className="--modal-sheet-overlay">

            <CloseIcon handle_click={props.handle_click} />

            <div className="card modal-sheet">
                <div className="modal-sheet__container modal-sheet__header">
                    <div className="modal-sheet__header-logo">
                        {props.data.logo ? <img src={props.data.logo} className="modal-sheet__header-img" /> : <div className="modal-sheet__header-img"></div>}
                    </div>

                    <h2 className="modal-sheet__title --cd --mt4">{props.data.full_name}</h2>
                    <button className="modal-sheet__cta --primary-btn --mt2" onClick={() => console.log('bruh')}>Предложить работу</button>
                </div>
                <hr className='--mt2'/>

                <div className="modal-sheet__container wp-main">
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
                <hr/>

                <div className="wp__experience modal-sheet__container">
                    {/* <Experience data={exp_data1} />
                    <Experience data={exp_data2} /> */}
                    experience
                </div>
                <hr/>

                <div className="wp__reviews modal-sheet__container">
                    {/* <Review data={review_data1} />
                    <Review data={review_data2}/> */}
                    Reviews
                </div>

            </div>
        </div>
    )
}

export default WorkerProfile