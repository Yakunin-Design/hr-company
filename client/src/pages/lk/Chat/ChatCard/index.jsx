import React from 'react'

import './ChatCard.css'

function ChatCard(props) {
    const {name, last_msg_time, last_msg_text, unread_msg_count} = props
    // const last_msg = last_msg_text.trim().slice(0, 20);

    return (
        <div className="card chat-card --row" onClick={() => props.handle_click(props.id)}>
            <div className="chat-card__avatar">
                АС
            </div>
            <div className="chat-card__content --column --space-between">
                <div className="--row --space-between">
                    <h3 className="chat-card__name">Андрей Савилов</h3>
                    <h3 className="chat-card__last-msg-time">06:57</h3>
                </div>
                <div className="--row --space-between">
                    <p className="chat-card__last-msg-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro hic voluptas repellat possimus qui mollitia nulla dicta quam dolores, commodi velit cumque, itaque eius debitis quaerat. Ab cumque voluptates velit placeat molestias tenetur ratione beatae necessitatibus dolorem quisquam, eius distinctio adipisci autem incidunt magnam quibusdam ipsa praesentium voluptatem totam deleniti, obcaecati facere neque similique non. Animi repellat, voluptate quae, suscipit aliquid ea voluptatum ut laboriosam temporibus accusamus eaque praesentium fugit ratione facere, maxime commodi dolores eos tenetur saepe eum doloribus. Molestiae ipsam repellat qui commodi nisi magnam vitae explicabo accusantium illum tempore nemo fugit cumque magni ut, minima ipsum atque.</p>
                    <div className="chat-card__unread-msg-count --cl">1</div>
                </div>
            </div> 
        </div>
    )
}

export default ChatCard