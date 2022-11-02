const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000
const authRouter = require("./routes/auth-router")
const autenticarToken = require("./middleware/autenticarToken")
const cors = require("cors")

let taskRoute = require("./routes/Rotas")

const dotenv = require('dotenv')
dotenv.config()
//console.log(process.env.MONGO_KEY)

app.use(cors())

app.use(express.json())

app.get("/" ,(req, res) =>{
    res.send("API TODO LIST HT V1.0.0 !")
}) 

mongoose.connect(process.env.MONGO_KEY)

 app.use('/tasks', autenticarToken, taskRoute)
//app.use('/tasks', taskRoute)
app.use('/auth', authRouter)


app.listen(port, ()=>{
    console.log(`Api rodando na porta ${port}`)
})

