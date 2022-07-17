import React from 'react'
import axios from 'axios'
import back_arrow_icon from '../../../../assets/svg/back-arrow.svg'
import send_arrow_icon from '../../../../assets/svg/send_arrow.svg'
import './ChatArea.css'
import Message from './Message'

export default function ChatArea(props) {

    const {user_name, chat_id} = props.display_chat
    const [messages, set_messages] = React.useState({
        user: '',
        msgs: []
    })
    
    const jwt = localStorage.getItem('jwt')

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + jwt
        }
    }

    const data = { id: chat_id }

    React.useEffect(() => {
        axios.post('http://localhost:6969/messages', data, config)
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }

            set_messages(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])
    
    const [new_msg_text, set_new_msg_text] = React.useState('')

    function send_message() {
        
        const data = {
            chat_id: chat_id,
            message: new_msg_text
        }

        axios.post('http://localhost:6969/send-message', data, config)
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }

            set_messages(prev => {
                return {
                    ...prev,
                    msgs: [...prev.msgs, {
                        time: Math.round(new Date() / 1000),
                        sender: true,
                        content: new_msg_text
                    }] 
                }
            })

            set_new_msg_text('')
        })
        .catch(e => {
            console.log(e)
        })
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
        
        <div className="--page-container chat-send">
            <input 
                type="text" 
                className='chat-send__input'
                value={new_msg_text}
                onChange={event => set_new_msg_text(event.target.value)}
            />
            <button className='btn chat-send__btn' title="Enter" onClick={send_message}>
                <img src={send_arrow_icon}/>
            </button>
        </div>
        </>
    )
}