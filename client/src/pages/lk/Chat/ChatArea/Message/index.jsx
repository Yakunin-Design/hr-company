import React from 'react'

import './Message.css'

import MessageText from './MessageText'

function Message(props) {
    return (
        <>
            <div className="--page-container message-container">
                <div className="message">
                    <div className="message__avatar">
                        <h5 className="message__no-avatar --cl">ПВ</h5>
                    </div>

                    <div className="message__content">
                        <h3 className="message__author">Пупин Вася</h3>

                        <MessageText />
                        <MessageText />
                    </div>
                </div>
            </div>
            <hr className='message__hr'/>
        </>
    )
}

export default Message