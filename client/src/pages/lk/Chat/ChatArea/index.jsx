import React from 'react'
import axios from 'axios'

import io from "socket.io-client";

import back_arrow_icon from '../../../../assets/svg/back-arrow.svg'
import send_arrow_icon from '../../../../assets/svg/send_arrow.svg'
import './ChatArea.css'
import Message from './Message'

const socket = io.connect("http://localhost:6969");
const jwt = localStorage.getItem('jwt')

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + jwt
    }
}

export default function ChatArea(props) {

    const {user_name, chat_id} = props.display_chat

    const [messages, set_messages] = React.useState({
        user: '',
        msgs: []
    })

    const [new_msg_text, set_new_msg_text] = React.useState('')
    
    const data = { id: chat_id }
    React.useEffect(() => {

        axios.post('http://localhost:6969/messages', data, config)
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }
            set_messages(() => { return res.data })
        })
        .catch(e => {
            console.log(e)
        })

        socket.emit('select_chat', chat_id)
    }, [])
    
    React.useEffect(() => {
        socket.on("receive_message", (data) => {
            set_messages(prev => {
                window.scrollTo(0, document.body.scrollHeight);
                return {
                    ...prev,
                    msgs: [
                        ...prev.msgs,
                        data
                    ]
                }
            });
        });

    }, [socket]);

    function send_message() {
        socket.emit("send_message", { chat_id, new_msg_text })

        const data = {
            time: Math.round(Date.now() / 1000),
            sender: true,
            content: new_msg_text
        }
        
        set_messages(prev => {
            return {
                ...prev,
                msgs: [
                    ...prev.msgs,
                    data
                ]
            }
        })

        set_new_msg_text('')

        window.scrollTo(0, document.body.scrollHeight);
    }

    const msg_array = messages.msgs.map(msg => {
        return (
            <Message key={msg.time + msg.sender} user_name={msg.sender ? "Вы" : user_name} time={msg.time} text={msg.content} />
        )
    })

    return (
        <>
        <div className="--page-container">
            <button className="btn --floating-btn --mt3" onClick={() => props.handle_click({user_name: '', chat_id: ''})}>
                <img src={back_arrow_icon} alt="back-btn" />
            </button>
            <h2 className="--cd">{user_name}</h2>
            <p className="--cd">{chat_id}</p>

        </div>
        <div className="messages">
            {msg_array}
        </div>

        <div className="--space"></div>
        
        <div className="--page-container chat-send">
            <input 
                type="text" 
                className='chat-send__input msg-input'
                value={new_msg_text}
                onChange={event => set_new_msg_text(event.target.value)}
                onKeyPress={event => {(event.key === 'Enter' && new_msg_text != '') && send_message()}}
            />
            <button className='btn chat-send__btn' type="input" id="send-msg-btn" title="Enter" onClick={send_message}>
                <img src={send_arrow_icon}/>
            </button>
        </div>
        </>
    )
}