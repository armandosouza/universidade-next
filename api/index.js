//imports
require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const jwt = require("jsonwebtoken")

//import routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const courseRoute = require("./routes/course")

//mongodb connection
mongoose.connect(process.env.MONGODB).then(() => {
	console.log("Conexão com o MongoDB feita com sucesso!")
}).catch((e) => {
	console.log(`Erro: ${e}`)
})

//middlewares
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())

//routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/course', courseRoute)

app.listen(process.env.PORT, () => {
	console.log(`Backend conectado em localhost:${process.env.PORT}`)
})