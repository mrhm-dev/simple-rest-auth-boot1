const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const contactRouter = require('./api/routes/router-contacts')
const userRouter = require('./api/routes/router-users')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/contact-list')

const db = mongoose.connection
db.on('error', () => {
    console.log('Database Not Connected')
})

db.once('open', () => {
    console.log('Database Connected')
})

const app = express()
app.use(cors())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

// Router Configuration
app.use('/api/contacts', contactRouter)
app.use('/api/users', userRouter)

// Error Handling
// 404 Error Handling
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// 500 Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error
    })
})


app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`)
})