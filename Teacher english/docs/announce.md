# Announce web page on bot start

Add these environment variables before running the announce script:

- `TELEGRAM_BOT_TOKEN` — your bot token
- `TELEGRAM_CHAT_ID` — the chat id to send the message to (your user id or channel id)
- `APP_URL` — (optional) the URL of the running web app, defaults to `http://localhost:3000`

Run once to send the "Open" button which opens the page on the user's device:

```bash
npm run announce
```

To run automatically on server boot you can use PM2:

```bash
# install pm2 if you don't have it
npm i -g pm2
# start the web preview (server) and the announce script
pm2 start npm --name "feruza-web" -- start
pm2 start npm --name "feruza-announce" -- run announce
# save & enable startup
pm2 save
pm2 startup
```

Notes:
- The announcement uses a Telegram inline keyboard URL button — when the user taps "Ochish" the URL will open on their device.
- If you need the server to open a browser window (GUI) instead, say so and I can add a server-side `xdg-open` action bound to a callback instead.
