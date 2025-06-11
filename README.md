# Telegram Bot for Sending .doc File

This is a Telegram bot built using Node.js that responds to `/implementation` by sending a `.doc` file.

## How to Run on Render

1. Upload this project to GitHub.
2. Go to [Render.com](https://render.com) and create a new **Web Service**.
3. Link your GitHub repo.
4. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variable:
   - `BOT_TOKEN` = your Telegram bot token from BotFather
