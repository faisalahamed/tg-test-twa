const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const BOT_TOKEN = '6942709880:AAG7stKmGYshFwGg5XBc3aXhCAgTJZC-wmU';
const WEB_APP_URL = 'https://faisalahamed.github.io/tg-test-twa/';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.use(express.json());

app.post('/webhook', (req, res) => {
    const chatId = req.body.message.chat.id;
    const replyMarkup = {
        inline_keyboard: [
            [
                {
                    text: "Open Web App",
                    web_app: { url: WEB_APP_URL }
                }
            ]
        ]
    };

    axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: "Welcome! Click the button below to open the web app.",
        reply_markup: replyMarkup
    })
    .then(response => {
        res.send('Message sent');
    })
    .catch(error => {
        console.error('Error sending message:', error);
        res.send('Error sending message');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
