// Write your "projects" router here!
const data = require('./projects-model')
const { checkId, checkBody } = require('./projects-middleware')
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
        res.locals.error = `Error getting project of id: ${req.params.id}`
        err.status = 500
        next(err)
    }
})

projects.get('/:id/actions', checkId, async (req, res, next) => {
    try {
        const { id } = req.params
        const actions = await data.getProjectActions(id)
        res.status(200).json(actions)
    } catch (err) {
        res.locals.error = `Error in getting project actions of id: ${req.params.id}`
    }
})

projects.post('/', checkBody, async (req, res, next) => {
    try {
        const { name, description, completed } = req.body
        const body = { name: name, description: description, completed: completed }
        const newProject = await data.insert(body)
        res.status(201).json(newProject)
    } catch (err) {
        res.locals.error = "Error posting project"
        err.status = 500
        next(err)
    }
})

projects.put('/:id', [checkId, checkBody], async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, description, completed } = req.body
        const body = { name: name, description: description, completed: completed }
        const updatedProject = await data.update(id, body)
        res.status(200).json(updatedProject)
    } catch (err) {
        res.locals.error = `Error in updating project of id: ${req.params.id}`
        err.status = 500
        next(err)
    }
})

projects.delete('/:id', checkId, async (req, res, next) => {
    try {
        const { id } = req.params
        await data.remove(id)
        res.status(200).end()
    } catch (err) {
        res.locals.error = `Error in deleting project of id: ${req.params.id}`
        err.status = 500
        next(err)
    }
})

projects.use((err, req, res, next) => {
    res.status(err.status).json({
        message: `[${res.locals.error || 'Middleware Error'}]: ${err.message}`
    })
})

module.exports = projects