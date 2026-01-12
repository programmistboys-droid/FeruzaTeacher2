# Bot auto-open behavior

This script listens for `/start` messages and replies to the sender with an inline "Ochish" button that opens the web app.

Environment variables:

- `TELEGRAM_BOT_TOKEN` — required
- `APP_URL` — optional, default `http://localhost:3000`

Run locally:

```bash
TELEGRAM_BOT_TOKEN="<token>" APP_URL="http://<host>:3000" npm run bot
```

PM2 (recommended for production):

```bash
npm i -g pm2
pm2 start npm --name "feruza-bot" -- run bot
pm2 save
pm2 startup
```

Notes:
- The bot will send the URL only to users who send `/start` to the bot, so each user's chat opens the page on their device when they press the button.
- If you want to pass a parameter via `/start <param>`, the bot will append `?start=<param>` to the `APP_URL`.
