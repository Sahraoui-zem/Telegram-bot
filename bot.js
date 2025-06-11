const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('❌ BOT_TOKEN is not set!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// 📄 /implementation
bot.onText(/\/implementation/, (msg) => {
  const chatId = msg.chat.id;
  const filePath = path.join(__dirname, 'cours-implementation-SQL-SERVER-S4.doc');

  if (fs.existsSync(filePath)) {
    bot.sendDocument(chatId, filePath).catch((err) => {
      console.error('❌ Error sending file:', err.message);
      bot.sendMessage(chatId, 'حدث خطأ أثناء إرسال الملف.');
    });
  } else {
    bot.sendMessage(chatId, '⚠️ ملف التنفيذ غير موجود.');
  }
});

// 📄 /administration
bot.onText(/\/administration/, (msg) => {
  const chatId = msg.chat.id;
  const filePath = path.join(__dirname, 'cours-administration-SQL-SERVER-S4.doc');

  console.log('Looking for file at:', filePath);
  console.log('File exists?', fs.existsSync(filePath));

  if (fs.existsSync(filePath)) {
    bot.sendDocument(chatId, filePath).catch((err) => {
      console.error('❌ Error sending file:', err.message);
      bot.sendMessage(chatId, 'حدث خطأ أثناء إرسال ملف الإدارة.');
    });
  } else {
    bot.sendMessage(chatId, '⚠️ ملف الإدارة غير موجود.');
  }
});

// 🚀 /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
👋 أهلاً بك في بوت الدروس!

الأوامر المتوفرة:
📄 /implementation — تحميل ملف شرح التنفيذ (Implementation)
📄 /administration — تحميل ملف شرح الإدارة (Administration)

إذا واجهت أي مشكلة، لا تتردد في التواصل معنا.
  `;

  bot.sendMessage(chatId, welcomeMessage);
});
