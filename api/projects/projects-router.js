// Write your "projects" router here!
const data = require('./projects-model')
const { checkId } = require('./projects-middleware')
const express = require('express')

const projects = express.Router()

projects.get('/', async (req, res, next) => {
    try {
        const projects = await data.get()
        res.status(200).json(projects)
    } catch (err) {
        res.locals.error = 'Error getting projects'
        err.status = 500
        next(err)
    }
})

projects.get('/:id', checkId, async (req, res, next) => {
    try {
        const { id } = req.params
        const project = await data.get(id)
        res.status(200).json(project)
    } catch (err) {
        res.locals.error = `Error getting project of id: ${id}`
        err.status = 500
        next(err)
    }
})

/**
 * 
 * projects.post('/', async (req, res, next) => {
    try {

    } catch (err) {
        res.locals.error = "Error posting project"
        err.status = 500
        next(err)
    }
})

 */

projects.use((err, req, res, next) => {
    res.status(err.status).json({
        message: `[${res.locals.error || 'Middleware Error'}]: ${err.message}`
    })
})

module.exports = projects