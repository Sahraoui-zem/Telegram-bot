const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('❌ BOT_TOKEN is not set!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/implementation/, (msg) => {
  const chatId = msg.chat.id;
  const filePath = path.join(__dirname, 'cours-implementation-SQL-SERVER-S4.doc');

  if (fs.existsSync(filePath)) {
    bot.sendDocument(chatId, filePath).catch((err) => {
      console.error('❌ Error sending file:', err.message);
      bot.sendMessage(chatId, 'حدث خطأ أثناء إرسال الملف.');
    });
  } else {
    bot.sendMessage(chatId, '⚠️ الملف غير موجود.');
  }
});
