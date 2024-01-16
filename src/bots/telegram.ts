import TelegramBot from "node-telegram-bot-api";
import db from "../lib/idb";
import { ObjectId } from "mongodb";

const token = "6584313509:AAEBvcoRdHNhbrVh9KN1Whw_Q13P4b9S7Rk";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    // @ts-ignore
    const resp = match[1];
    console.log(resp);

    bot.sendMessage(chatId, resp);
});

bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    // @ts-ignore
    const user_id = new ObjectId(match[1]);

    console.log("\nUser ID:");
    console.log(user_id);
    console.log("User telegram ID:");
    console.log(msg.chat.id);

    // find user in db
    let collection_name = "workers";
    let db_user = await db.find(user_id, "workers");
    if (db_user.Ok === null) {
        db_user = await db.find(user_id, "employers");
        collection_name = "employers";
    } else console.log("ERROR: user was not found");

    // add telegram id to user database
    const db_update = await db.update(
        { _id: user_id },
        { $set: { telegram_id: msg.chat.id } },
        collection_name
    );

    if (!db_update.Ok)
        return bot.sendMessage(chatId, "Ошибка при подключении уведомлений");

    bot.sendMessage(chatId, "Вы подключили уведомления!");
});

function send_message(chat_id: string, msg: string) {
    bot.sendMessage(chat_id, msg);
}

export { send_message };
