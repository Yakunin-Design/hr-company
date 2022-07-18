import React from 'react'

import './ChatCard.css'

function ChatCard(props) {
    const {chat_data, handle_click} = props
    const {chat_id, user_name, last_msg, last_msg_time, unread_msg} = chat_data

    // const last_msg = last_msg_text.trim().slice(0, 20);

    const name = user_name.split(' ')
    const initials = name[0][0] + name[1][0]

    const date = new Date(last_msg_time * 1000)
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
    const time = hours + ":" + minutes

    return (
        <div className="card chat-card --row" onClick={() => handle_click({user_name, chat_id})}>
            <div className="chat-card__avatar">
                {initials}
            </div>
            <div className="chat-card__content --column --space-between">
                <div className="--row --space-between">
                    <h3 className="chat-card__name">{user_name}</h3>
                    <h3 className="chat-card__last-msg-time">{time}</h3>
                </div>
                <div className="--row --space-between">
                    <p className="chat-card__last-msg-text" title={last_msg}>{last_msg}</p>
                    {
                        unread_msg != 0 && <div className="chat-card__unread-msg-count --cl">{unread_msg}</div>
                    }
                </div>
            </div> 
        </div>
    )
}

export default ChatCard