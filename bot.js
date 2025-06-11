const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// استخدم المتغير البيئي بدلاً من وضع التوكن مباشرة
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/implementation/, (msg) => {
  const chatId = msg.chat.id;
  const filePath = path.join(__dirname, 'cours-implementation-SQL-SERVER-S4.doc');

  if (fs.existsSync(filePath)) {
    bot.sendDocument(chatId, filePath);
  } else {
    bot.sendMessage(chatId, 'الملف غير موجود.');
  }
});

// 🚀 /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
👋 أهلاً بك في بوت الدروس!

الأوامر المتوفرة:
📄 /implementation — تحميل ملف شرح التنفيذ (Implementation)
📄 /administration — تحميل ملف شرح الإدارة (Administration) لا يوجد الآن ❌

إذا واجهت أي مشكلة، لا تتردد في التواصل معنا.
  `;

  bot.sendMessage(chatId, welcomeMessage);
});
