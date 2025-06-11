const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
👋 أهلاً بك في بوت الدروس!

الأوامر المتوفرة:
📄 /implementation — تحميل ملف شرح التنفيذ (Implementation)
📚 /administration — تحميل مجموعة ملفات الإدارة (Administration)

إذا واجهت أي مشكلة، لا تتردد في التواصل معنا.
  `;

  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/implementation/, (msg) => {
  const chatId = msg.chat.id;
  const filePath = path.join(__dirname, 'cours-implementation-SQL-SERVER-S4.doc');

  if (fs.existsSync(filePath)) {
    bot.sendDocument(chatId, filePath);
  } else {
    bot.sendMessage(chatId, 'ملف التنفيذ غير موجود.');
  }
});

bot.onText(/\/administration/, (msg) => {
  const chatId = msg.chat.id;
  const zipPath = path.join(__dirname, 'administration_docs.zip');

  if (fs.existsSync(zipPath)) {
    bot.sendDocument(chatId, zipPath);
  } else {
    bot.sendMessage(chatId, 'الملف المضغوط administration_docs.zip غير موجود.');
  }
});
