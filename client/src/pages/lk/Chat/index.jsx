import React from 'react'
import LkNav from '../../../components/MainNav'
import axios from 'axios'
import io from "socket.io-client";

import Footer from '../../../components/Footer'

import '../../../styles/utils/lk.css'
import './ChatList.css'

import ChatCard from './ChatCard'
import ChatArea from './ChatArea'

const socket = io.connect("http://localhost:6969");

function ChatList(props) {

    const [display_chat, set_display_chat] = React.useState({
        user_name: '',
        chat_id: ''
    })

    const [messages, set_messages] = React.useState({
        user: '',
        msgs: []
    })

    const [chat_list, set_chat_list] = React.useState([])
   
    const jwt = localStorage.getItem('jwt')

    const config = {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    }

    React.useEffect(() => {
        axios.get('http://localhost:6969/chats', config)
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }

            set_chat_list(res.data)

            let chats = []
            res.data.forEach(chat => {
                chats.push(chat.chat_id)
            })
            socket.emit('select_chat', chats)
            
        })
        .catch(e => {
            console.log(e)
        })
    }, [display_chat])

    React.useEffect(() => {
        socket.on("receive_message", (data) => {

            if (display_chat.chat_id === '' ) {

                axios.get('http://localhost:6969/chats', config)
                .then(res => {
                    if (!res.data) {
                        return console.log('bruh')
                    }

                    set_chat_list(res.data)

                    let chats = []
                    res.data.forEach(chat => {
                        chats.push(chat.chat_id)
                    })
                    socket.emit('select_chat', chats)
                    
                })

            } else {

                axios.post('http://localhost:6969/read-messages', { id: display_chat.chat_id }, config)
                .then(res => {
                    if (!res.data) {
                        return console.log('bruh')
                    }
                })
                .catch(e => {
                    console.log(e)
                })

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
            }
            
        });

    }, [socket, display_chat]);

    const chat_cards = chat_list.map(chat => <ChatCard handle_click={set_display_chat} key={chat.chat_id} chat_data={chat} />)

    return (
        <div className="lk">
            <LkNav page="chat" user_type={props.user.user_type}/>
            <main className="lk__container">
                    {
                        display_chat.chat_id === '' 
                        ?
                        <>
                        <div className="--page-container --page-content">
                            <h2 className='chat-title'>Ваши чаты</h2>
                            <div className="chat-container">
                                {chat_cards}
                            </div>
                        </div>
                        <Footer />
                        </>
                        :
                        <ChatArea
                            display_chat={display_chat}
                            handle_click={set_display_chat}
                            messages={messages} 
                            set_messages={set_messages} 
                            socket={socket}
                        />
                    }

            </main>
        </div>
    )
}

export default ChatList