import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const appUrl = process.env.APP_URL || 'http://localhost:3000';

if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN environment variable.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (err) => {
  console.error('Polling error:', err?.message || err);
});

bot.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match && match[1] ? match[1].trim() : null;

  const url = appUrl + (param ? `?start=${encodeURIComponent(param)}` : '');
  const text = 'Salom! Web sahifani ochish uchun "Ochish" tugmasini bosing.';

  bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: [[{ text: 'Ochish', url }]]
    }
  }).catch(err => console.error('sendMessage error:', err));
});

console.log('Telegram bot started and listening for /start.');
