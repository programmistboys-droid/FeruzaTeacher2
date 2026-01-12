import process from 'process';

(async function main(){
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables. Message not sent.');
    process.exit(1);
  }

  const text = `Bot ishga tushdi. Web sahifani ochasizmi?`;
  const body = {
    chat_id: chatId,
    text,
    reply_markup: {
      inline_keyboard: [[
        { text: 'Ochish', url: appUrl }
      ]]
    }
  };

  try {
    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    if (!data.ok) {
      console.error('Telegram API error:', data);
      process.exit(1);
    }

    console.log('Telegram message sent successfully.');
    // keep the process alive a bit so PM2/systemd logs are readable if running
    setTimeout(() => process.exit(0), 1000);
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
    process.exit(1);
  }
})();
