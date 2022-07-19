import React from 'react'

import CloseIcon from '../../assets/svg/close-icon-white'

import './WorkerProfile.css'

function WorkerProfile(props) {

    return (
        <div className="JobOffer-container">

            <CloseIcon handle_click={props.handle_click} />

            <div className="card JobOffer">
                <div className="JobOffer__header">
                    <div className="JobOffer__company-logo company-logo">
                        <div className="company-logo__image"></div>
                    </div>

                    <h2 className="--mt1 --cd">{props.user_name}</h2>
                    <button className="--primary-btn --mt2" onClick={() => console.log('bruh')}>Предложить работу</button>
                </div>
                <hr className='JobOffer_hr --top-hr' />

                <div className="JobOffer__main">
                    <div className="JobOffer__description"><h3>Описание отсутствует</h3></div>
                </div>

            </div>
        </div>
    )
}

export default WorkerProfile