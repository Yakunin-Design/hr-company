import { Telegraf } from "telegraf";
import { message }  from "telegraf/filters";

const token = "6584313509:AAEBvcoRdHNhbrVh9KN1Whw_Q13P4b9S7Rk";

// const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Telegraf(token);

bot.start((ctx: any) => ctx.reply('Welcome'));

bot.help((ctx: any) => ctx.reply('Send me a sticker'));

bot.on(message('sticker'), (ctx: any) => ctx.reply('👍'));

bot.hears('hi', (ctx: any) => ctx.reply('Hey there'));

bot.launch();

