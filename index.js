const express = require("express")
const mongoose = require("mongoose")
// const config = require("config")
const authRouter = require("./routers/authRouter")
const appRouter = require("./routers/appRouter")
const app = express()
const PORT = process.env.PORT || 5000
const corsMiddleware = require("./middleware/cors.middleware")
const path=require('path')

app.use(corsMiddleware)
app.use(express.json())
app.use("/auth", authRouter)
app.use("/app", appRouter)
app.use(express.static(path.join(__dirname, 'public')));

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://yurashk:92Ozuzud@cluster0.cobjhb1.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started at ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}

start()
