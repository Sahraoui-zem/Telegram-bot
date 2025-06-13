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
🖼️ /delphi — عرض صور مجلد Delphi

إذا واجهت أي مشكلة، لا تتردد في التواصل معنا: @Designn_Art
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

bot.onText(/\/delphi/, (msg) => {
  const chatId = msg.chat.id;
  const imagesDir = path.join(__dirname, 'Delphi');

  fs.readdir(imagesDir, (err, files) => {
    if (err || files.length === 0) {
      bot.sendMessage(chatId, 'لم يتم العثور على صور في مجلد Delphi.');
      return;
    }

    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      bot.sendMessage(chatId, 'لا توجد صور صالحة في مجلد Delphi.');
      return;
    }

    // إرسال الصور واحدة تلو الأخرى
    imageFiles.forEach((file) => {
      const filePath = path.join(imagesDir, file);
      bot.sendPhoto(chatId, fs.createReadStream(filePath));
    });
  });
});
