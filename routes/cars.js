const Joi = require('joi')
const { Router } = require('express')
const router = Router()


const cars = [
    { name: 'Nexia', age: 7, id: 1 },
    { name: 'Lacetti', age: 4, id: 2 },
    { name: 'Cobalt', age: 1, id: 3 },
]

router.get('/', (req, res) => {
    res.status(200).send(cars)
})

router.get('/car', (req, res) => {
    const car = cars.find(val => val.age === +req.query.age)
    res.status(200).send(car)
})

router.get('/:id', (req, res) => {
    const car = cars.find(val => val.id === +req.params.id)
    res.status(200).send(car)
})

router.post('/add', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().trim().required().min(3),
        age: Joi.number().integer().required().min(6).max(100)
    })

    const validation = schema.validate(req.body)

    if (!!validation.error) {
        return res.status(400).send(validation.error.message)
    }

    const car = {
        id: cars.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    cars.push(car)
    res.status(201).send('Car created')
})

module.exports = router