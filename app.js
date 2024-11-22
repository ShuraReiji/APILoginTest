

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// PLACE THE DB CONNECTION
const db = require("./API/models/connection_db")
db.connectDatabase()


//PLACE OUR ROUTERS
const userRouter = require('./API/routers/user_router')

//DEFINE SETTINGS FOR BODY-PARSER AND MORGAN
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DEFINE HEADER SETTINGS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Header", "*")

    if (req.method == 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "*")
        return res.status(200).json({})
    }

    next()
})

//DEFINE OUR MODULE PLUS THE ROUTER
app.use('/users', userRouter)

//ERROR MIDDLEWARE
app.use((req, res, next)=>{
    const error = new error("Not Found")
    error.status = 404
    next(error)

})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message 
        }
    })
})


module.exports = app
