// Write your "actions" router here!
const data = require('./actions-model.js')
const { checkId } = require('./actions-middlware.js')
const express = require('express')

const actions = express.Router()

actions.get('/', async (req, res, next) => {
    try {
        const actions = await data.get()
        res.status(200).json(actions)
    } catch (err) {
        res.locals.error = 'Error in getting actions'
        err.status = 500
        next(err)
    }
})

actions.get('/:id', checkId, async (req, res, next) => {
    try {
        const {id} = req.params
        const action = await data.get(id)
        res.status(200).json(action)
    } catch(err) {
        res.locals.error = `Error in getting action of id ${req.params.id}`
    }
})

actions.use((error, req, res, next) => {
    res.status(error.status).json({
        message: `[${res.locals.error || 'Middleware error'}]: ${error.message}`
    })
})

module.exports = actions