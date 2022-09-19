const express = require('express')
const app = express()
const morgan = require('morgan')

const homeRouter = require('./routes/home')
const carsRouter = require('./routes/cars')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'))
}

app.use(function logger(req, res, next) {
    console.log('logging');
    next()
})

app.use('/', homeRouter)
app.use('/cars', carsRouter)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server working on port ', port);
})