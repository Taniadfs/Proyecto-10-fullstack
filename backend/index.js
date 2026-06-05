require ('dotenv').config()
const express= require ('express')
const connectDB = require ('./src/config/db')
const cors = require('cors')
const authRoutes = require('./src/api/routes/authRoutes')
const eventoRoutes = require('./src/api/routes/eventoRoutes')


const app=express()
const PORT=process.env.PORT || 5000
connectDB()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/auth', authRoutes)
app.use('/eventos', eventoRoutes)

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

