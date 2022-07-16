import React from 'react'
import LkNav from '../../../components/MainNav'

import Footer from '../../../components/Footer'

import '../../../styles/utils/lk.css'
import './ChatList.css'

import ChatCard from './ChatCard'
import ChatArea from './ChatArea'

function ChatList(props) {

    const [display_chat, set_display_chat] = React.useState('')
    
    return (
        <div className="lk">
            <LkNav page="chat" user_type={props.user.user_type}/>
            <main className="lk__container">
                    {
                        display_chat === '' 
                        ?
                        <>
                        <div className="--page-container">
                            <h2 className='chat-title'>Ваши чаты</h2>
                            <div className="chat-container">
                                <ChatCard handle_click={set_display_chat} id={1} />
                                <ChatCard handle_click={set_display_chat} id={2} />
                            </div>
                        </div>
                        <Footer />
                        </>
                        : <ChatArea chat_id={display_chat} handle_click={set_display_chat}/>
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