## Document structure model in 'chat' collection
```typescript
// chat 
const chat = {
    _id
    user1: ObjectId,
    user2: ObjectId,
    message: {
        time: number,
        sender: "1" || "2",
        content: string,
    }

    user1_unread_messages_count: number,
    user2_unread_messages_count: number
}
```

## Backend functions
```typescript
    // get chats
    function get_chats() ->

    [
        {
            chat_id: ObjectId,
            user_name: string,
            user_photo?: file,
            last_message: string,
            last_message_time: number,
            unread_messages_count: number
        },
        {
            chat_id: ObjectId,
            user_name: string,
            user_photo?: file,
            last_message: string,
            last_message_time: number,
            unread_messages_count: number
        }
    ]

    const chats = find_all({$or{user1: jwt.id}, {user2: jwt.id}}, 'chats')

    if chat.user1 === jwt.id
    const user2 = find({id: chat.user2}, 'users') 

    function get_messages(chat_id: ObjectId) -> Chat

    function send_message(chat_id, content) -> 200 {
        // note!
        // dont forget to update user_unread_messages_count
    }

```