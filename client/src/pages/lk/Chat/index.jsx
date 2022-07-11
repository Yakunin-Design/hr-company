import React from 'react'
import LkNav from '../../../components/MainNav'

import Footer from '../../../components/Footer'
import '../../../styles/utils/lk.css'

import Message from './Message'

function Chat(props) {
    return (
        <div className="lk">
            <LkNav page="chat" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container">
                    <h2>Chat</h2>
                </div>

                <Message />
                <Message />
                <Message />
                <Message />
                <Message />

                <Footer />
            </main>
        </div>
    )
}

export default Chat