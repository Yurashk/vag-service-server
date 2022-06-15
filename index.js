const express = require("express")
const mongoose = require("mongoose")
const TelegramApi = require("node-telegram-bot-api")
const https = require('https')
const fs = require('fs')
const authRouter = require("./routers/authRouter")
const appRouter = require("./routers/appRouter")
const app = express()
const PORT = process.env.PORT || 5000
const corsMiddleware = require("./middleware/cors.middleware")
const path = require('path')

app.use(corsMiddleware)
app.use(express.json())
app.use("/auth", authRouter)
app.use("/app", appRouter)
app.use(express.static(path.join(__dirname, 'public')));

const sslServer = https.createServer({

    // key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    // cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
    key: fs.readFileSync('/etc/letsencrypt/live/vag-cars.in.ua/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/vag-cars.in.ua/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/vag-cars.in.ua/chain.pem'),
}, app)

const start = async () => {
    try {
        // bot.on('channel_post', (updates) => {
            // 'msg' is the received Message from Telegram
            // 'match' is the result of executing the regexp above on the text content
            // of the message
            // console.log(updates);
            // const chatId = msg.chat.id;
            // const resp = match[1]; // the captured "whatever"
            //
            // // send back the matched "whatever" to the chat
            // bot.sendMessage(-1001775833457, 'asdasda');
        // });
        await mongoose.connect(`mongodb+srv://yurashk:92Ozuzud@cluster0.cobjhb1.mongodb.net/?retryWrites=true&w=majority`)
        sslServer.listen(5000, () => console.log(`server started at ${PORT} port`))
        // app.listen(PORT, () => console.log(`server started at ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}

start()
