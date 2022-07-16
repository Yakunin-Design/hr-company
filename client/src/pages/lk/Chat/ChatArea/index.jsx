import React from 'react'
import back_arrow_icon from '../../../../assets/svg/back-arrow.svg'
import send_arrow_icon from '../../../../assets/svg/send_arrow.svg'
import './ChatArea.css'
import Message from './Message'

export default function ChatArea(props) {

    return (
        <>
        <div className="--page-container">
            <button className="btn --floating-btn --mt3" onClick={() => props.handle_click('')}>
                <img src={back_arrow_icon} alt="back-btn" />
            </button>
            <h2 className="--cd">Hi mom!</h2>
            <p className="--cd">{props.chat_id}</p>

        </div>
        <div className="messages">
            <Message />
            <Message />
        </div>
        

        <div className="--page-container chat-send">
            <input type="text" className='chat-send__input'/>
            <button className='btn chat-send__btn' title="Enter">
                <img src={send_arrow_icon}/>
            </button>
        </div>
        </>
    )
}