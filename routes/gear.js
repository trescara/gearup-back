const express = require('express')
const router = express.Router()
const knex = require('../database-connections')
const queries = require('../queries')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(morgan('tiny'))

function validItem(item) {
    const hasCategory = typeof item.category == 'string' && item.category.trim() != ''
    const hasType = typeof item.gear_type == 'string' && item.gear_type.trim() != ''
    const hasDescription = typeof item.description == 'string' && item.description.trim() != ''
    const hasImage = typeof item.image_url == 'string' && item.image_url.trim() != ''
    return hasCategory && hasType && hasDescription && hasImage
}

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
    if(validItem(request.body)) {
    queries.create(request.body)
    .then(gear => {
        response.status(201).json({ gear })
    })} else {
    next(new Error('Invalid Submission'))
    }
})

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id)
    .then(() => {
        response.status(204).json({deleted: true})
    })
    .catch(next)
})

router.put("/:id", (request, response, next) => {
    if(validItem(request.body)) {
    queries.update(request.params.id, request.body)
    .then(gear => {
        response.json({ gear })
    })} else {
    next(new Error('Invalid Submission'))
    }
})

module.exports = router
