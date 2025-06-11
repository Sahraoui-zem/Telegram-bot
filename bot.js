const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// استخدم متغير البيئة
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
  const outputZip = path.join(__dirname, 'administration_docs.zip');
  const docsFolder = path.join(__dirname, 'administration_docs');

  if (!fs.existsSync(docsFolder)) {
    bot.sendMessage(chatId, 'مجلد الإدارة غير موجود.');
    return;
  }

  // حذف الملف المضغوط السابق إن وجد
  if (fs.existsSync(outputZip)) {
    fs.unlinkSync(outputZip);
  }

  // إنشاء الملف المضغوط
  const output = fs.createWriteStream(outputZip);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    bot.sendDocument(chatId, outputZip);
  });

  archive.on('error', (err) => {
    bot.sendMessage(chatId, 'حدث خطأ أثناء ضغط الملفات.');
    console.error(err);
  });

  archive.pipe(output);
  archive.directory(docsFolder, false);
  archive.finalize();
});
