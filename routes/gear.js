const express = require('express')
const router = express.Router()
const knex = require('../database-connections')
const queries = require('../queries')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(morgan('tiny'))


router.get("/", (request, response, next) => {
    queries.list()
    .then(gear => {
        response.json({gear})
    })
    .catch(next)
})

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id)
    .then(gear => {
        gear
            ? response.json({ gear })
            : response.status(404).json({message: 'Not found'})
    })
    .catch(next)
})

router.get("/category/:category", (request, response, next) => {
    queries.readCategory(request.params.category)
    .then(gear => {
        gear
            ? response.json({ gear })
            : response.status(404).json({message: 'Not found'})
    })
    .catch(next)
})

router.get("/user/:owner", (request, response, next) => {
    queries.readOwner(request.params.owner)
    .then(gear => {
        gear
            ? response.json({ gear })
            : response.status(404).json({message: 'Not found'})
    })
    .catch(next)
})


router.post("/", (request, response, next) => {
    queries.create(request.body)
    .then(gear => {
        response.status(201).json({ gear })
    })
    .catch(next)
})

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id)
    .then(() => {
        response.status(204).json({deleted: true})
    })
    .catch(next)
})

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body)
    .then(gear => {
        response.json({ gear })
    })
    .catch(next)
})

module.exports = router
