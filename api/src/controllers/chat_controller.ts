import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import db from '../lib/idb';
import Result from '../lib/Result';

async function get_chats(req: Request, res: Response) {
    async function parse_chat(chat: any) {
        const another_user_id =
            chat.user1.toString() === id.toString() ? chat.user2 : chat.user1;
        const user_type =
            res.locals.jwt.user_type === 'worker' ? 'employers' : 'workers';

        let another_user = await db.find({ _id: another_user_id }, user_type);

        if (another_user.Err) {
            res.status(400).send('database error: cannot find user [1]');
            return {};
        }

        if (another_user.Ok === null) {
            another_user = await db.find(
                { _id: another_user_id },
                user_type === 'workers' ? 'employers' : 'workers'
            );

            if (another_user.Err) {
                res.status(400).send('database error: cannot find user [2]');
                return {};
            }
        }

        const last_message = chat.msgs[chat.msgs.length - 1] || '';

        const unread_messages =
            chat.user1.toString() === id.toString()
                ? chat.unread_count1
                : chat.unread_count2;

        return {
            chat_id: chat._id,
            user_name: another_user.Ok!.full_name,
            last_msg: last_message.content,
            last_msg_time: last_message.time || '',
            unread_msg: unread_messages,
        };
    }

    const id = res.locals.user._id;

    const chats = await db.find_all(
        { $or: [{ user1: id }, { user2: id }] },
        'chats'
    );

    if (chats.Err) return res.status(400).send('database error: find_chat [3]');

    if (chats.Ok === null) {
        return res.status(200).send([]);
    }

    const response = await Promise.all(
        chats.Ok.map(async chat => await parse_chat(chat))
    );

    res.status(200).send(response);
}

async function get_messages(req: Request, res: Response) {
    const chat_id = new ObjectId(req.body.id);
    const chat = await db.find({ _id: chat_id }, 'chats');

    if (chat.Err) return res.status(400).send('database error: find_chat');

    if (chat.Ok === null) return res.status(400).send('wrong chat id');

    if (
        chat.Ok.user1.toString() != res.locals.user._id.toString() &&
        chat.Ok.user2.toString() != res.locals.user._id.toString()
    ) {
        return res.status(404).send(':(');
    }

    const user =
        res.locals.user._id.toString() === chat.Ok.user1.toString()
            ? chat.Ok.user2
            : chat.Ok.user1;

    const msgs = chat.Ok.msgs.map(msg => {
        const user_id = res.locals.user._id.toString();
        const user1 = chat.Ok!.user1.toString();
        const user2 = chat.Ok!.user2.toString();

        return {
            ...msg,
            sender:
                user_id === user1 && msg.sender === 1
                    ? true
                    : user_id === user2 && msg.sender === 2
                    ? true
                    : false,
        };
    });

    const response = {
        user,
        msgs,
    };

    const user_notify =
        res.locals.user._id.toString() === chat.Ok.user1.toString()
            ? { unread_count1: 0 }
            : { unread_count2: 0 };

    const notify_reset = await db.update(
        { _id: chat_id },
        { $set: { ...user_notify } },
        'chats'
    );

    if (notify_reset.Err)
        return res.status(400).send('unable to get messages :(');

    res.status(200).send(response);
}

async function new_chat(req: Request, res: Response) {
    const { another_user_id } = req.body;

    const chat_id = await create_chat(
        res.locals.jwt.user_type,
        res.locals.user._id,
        another_user_id
    );

    return res.send(chat_id);
}

async function create_chat(
    my_user_type: string,
    my_user_id: string,
    another_user_id: string
): Promise<ObjectId | Error> {
    const chat = {
        user1:
            my_user_type === 'employer'
                ? new ObjectId(my_user_id)
                : new ObjectId(another_user_id),
        user2:
            my_user_type != 'employer'
                ? new ObjectId(my_user_id)
                : new ObjectId(another_user_id),
        msgs: [],
        unread_count1: 0,
        unread_count2: 0,
    };

    const db_result = await db.save(chat, 'chats');
    if (db_result.Err) return db_result.Err;

    return db_result.Ok!;
}

async function send_message(req: Request, res: Response) {
    const { message, another_user_id } = req.body;
    let { chat_id } = req.body;

    if (another_user_id) {
        chat_id = await create_chat(
            res.locals.jwt.user_type,
            res.locals.user._id,
            another_user_id
        );

        if (chat_id.Err) return res.status(400).send('wrong data');
    }

    // find chat by chat id
    const chat = await db.find({ _id: new ObjectId(chat_id) }, 'chats');
    if (chat.Err) return res.status(400).send('database error: find_chat');

    // Check if it is your chat
    if (
        res.locals.user._id.toString() != chat.Ok!.user1.toString() &&
        res.locals.user._id.toString() != chat.Ok!.user2.toString()
    ) {
        res.status(400).send('not your chat');
    }

    // update chat msg array by adding new object
    const new_msg = {
        time: Math.floor(Date.now() / 1000),
        sender:
            res.locals.user._id.toString() === chat.Ok!.user1.toString()
                ? 1
                : 2,
        content: message,
    };

    const messages = [...chat.Ok!.msgs, new_msg];

    const unread_count1 =
        res.locals.user._id.toString() === chat.Ok!.user1.toString()
            ? chat.Ok!.unread_count1
            : chat.Ok!.unread_count1 + 1;
    const unread_count2 =
        res.locals.user._id.toString() === chat.Ok!.user1.toString()
            ? chat.Ok!.unread_count2 + 1
            : chat.Ok!.unread_count2;

    const edits = {
        msgs: messages,
        unread_count1,
        unread_count2,
    };
    // time, sender, content: message text

    const db_result = await db.update(
        { _id: new ObjectId(chat_id) },
        { $set: { ...edits } },
        'chats'
    );

    if (db_result.Err) return res.status(400).send(db_result.Err.message);

    res.status(200).send('message sended!');
}

async function read_messages(req: Request, res: Response) {
    try {
        const chat_id = req.body.id;

        const my_id = res.locals.user._id.toString();

        const chat = await db.find({ _id: new ObjectId(chat_id) }, 'chats');

        if (chat.Err) return res.status(400).send('database error: find_chat');

        const unread_messages =
            my_id === chat.Ok!.user1.toString()
                ? { unread_count1: 0 }
                : { unread_count2: 0 };

        const db_result = await db.update(
            { _id: new ObjectId(chat_id) },
            { $set: { ...unread_messages } },
            'chats'
        );

        if (db_result.Err) return res.status(400).send(db_result.Err.message);

        res.status(200).send('messages readed!');
    } catch (e) {
        console.log('[EDIT]', e);
    }
}

export { get_chats, get_messages, send_message, new_chat, read_messages };
