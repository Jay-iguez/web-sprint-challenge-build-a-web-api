// Write your "actions" router here!
const data = require('./actions-model.js')
const { checkId, checkBody } = require('./actions-middlware.js')
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
        const { id } = req.params
        const action = await data.get(id)
        res.status(200).json(action)
    } catch (err) {
        res.locals.error = `Error in getting action of id ${req.params.id}`
        err.status = 500
        next(err)
    }
})

actions.post('/', checkBody, async (req, res, next) => {
    try {
        const { project_id, description, notes, completed = false } = req.body
        const body = { project_id: project_id, description: description, notes: notes, completed: completed }
        const newAction = await data.insert(body)
        res.status(201).json(newAction)
    } catch (err) {
        res.locals.error = 'Error in creating new action'
        err.status = 500
        next(err)
    }
})

actions.put('/:id', [checkId, checkBody], async (req, res, next) => {
    try {
        const { id } = req.params
        const { project_id, description, notes, completed = false } = req.body
        const body = { project_id: project_id, description: description, notes: notes, completed: completed }
        const updatedAction = await data.update(id, body)
        res.status(200).json(updatedAction)
    } catch (err) {
        res.locals.error = `Error in updating action of id ${req.params.id}`
        err.status = 500
        next(err)
    }
})

actions.delete('/:id', checkId, async (req, res, next) => {
    try {
        const { id } = req.params
        await data.remove(id)
        res.status(200).end()
    } catch (err) {
        res.locals.error = `Error in deleting action of id ${req.params.id}`
        err.status = 500
        next(err)
    }
})

actions.use((error, req, res, next) => {
    res.status(error.status).json({
        message: `[${res.locals.error || 'Middleware error'}]: ${error.message}`
    })
})

module.exports = actions