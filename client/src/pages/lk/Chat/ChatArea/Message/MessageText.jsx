import React from 'react'

function MessageText(props) {
    const date = new Date(props.time * 1000)
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
    const time = hours + ":" + minutes

    return (
        <div className="message__text">
            <h4 className="message__time">{time}</h4>
            <p>{props.text}</p>
        </div>
    )
}

export default MessageText