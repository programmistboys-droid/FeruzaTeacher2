import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const appUrl = process.env.APP_URL || 'http://localhost:3000';

if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN environment variable.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Send a startup greeting to an admin chat (if configured)
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
if (adminChatId) {
  // small delay to ensure long polling is started
  setTimeout(() => {
    bot.sendMessage(adminChatId, 'Bot ishga tushdi. Salom!')
      .then(() => console.log('Startup greeting sent to', adminChatId))
      .catch(err => console.error('Failed to send startup greeting:', err));
  }, 1000);
} else {
  console.log('No TELEGRAM_ADMIN_CHAT_ID or TELEGRAM_CHAT_ID set — startup greeting will not be sent.');
}

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
