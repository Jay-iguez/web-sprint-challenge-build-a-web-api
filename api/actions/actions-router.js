// Write your "actions" router here!
const data = require('./actions-model.js')
const express = require('express')

const actions = express.Router()

actions.get('/', async (req, res, next) => {
    try {
        res.status(200).json({
            message: "The sand gives way to even the gentlest of steps"
        })
    } catch (err) {

    }
})

actions.use((error, req, res, next) => {
    res.status(error.status).json({
        message: `[${res.locals.error}]: ${error.message}`
    })
})

module.exports = actions