import React from 'react'

import './Message.css'

import MessageText from './MessageText'

function Message(props) {

    const name = props.user_name === 'Вы' ? 'Вы' : props.user_name.split(' ')
    const initials = name[0][0] + name[1][0]

    return (
        <>
            <div className="--page-container message-container">
                <div className="message">
                    <div className="message__avatar">
                        <h5 className="message__no-avatar --cl">{initials}</h5>
                    </div>

                    <div className="message__content">
                        <h3 className="message__author">{props.user_name}</h3>

                        <MessageText text={props.text} time={props.time} />
                    </div>
                </div>
            </div>
            <hr className='message__hr'/>
        </>
    )
}

export default Message