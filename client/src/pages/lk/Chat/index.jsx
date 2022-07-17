import React from 'react'
import LkNav from '../../../components/MainNav'
import axios from 'axios'

import Footer from '../../../components/Footer'

import '../../../styles/utils/lk.css'
import './ChatList.css'

import ChatCard from './ChatCard'
import ChatArea from './ChatArea'

function ChatList(props) {

    const [display_chat, set_display_chat] = React.useState({
        user_name: '',
        chat_id: ''
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
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const chat_cards = chat_list.map(chat => <ChatCard handle_click={set_display_chat} key={chat.chat_id} chat_data={chat} />)

    return (
        <div className="lk">
            <LkNav page="chat" user_type={props.user.user_type}/>
            <main className="lk__container">
                    {
                        display_chat.chat_id === '' 
                        ?
                        <>
                        <div className="--page-container">
                            <h2 className='chat-title'>Ваши чаты</h2>
                            <div className="chat-container">
                                {chat_cards}
                            </div>
                        </div>
                        <Footer />
                        </>
                        : <ChatArea display_chat={display_chat} handle_click={set_display_chat}/>
                    }

            </main>
        </div>
    )
}

/**
 *  params = chat_id, user_id
 * 
 *  
 */

export default ChatList