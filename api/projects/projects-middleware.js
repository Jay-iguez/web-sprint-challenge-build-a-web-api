// add middlewares here related to projects
const data = require('./projects-model')

const checkTypeOf = (value, type) => {
    return typeof value === type ? true : false
}

async function checkId (req, res, next) {
    const { id } = req.params

    const project = await data.get(id)

    if (project !== null) {
        next()
    } else {
        const error = new Error('Project of id: ' + id + ' does not exist!')
        error.status = 404
        next(error)
    }
}

function checkBody (req, res, next) {
    const { name, description, completed} = req.body

    if (checkTypeOf(name, 'string') && checkTypeOf(description, 'string') && checkTypeOf(completed, 'boolean')) {
        next()
    } else {
        const error = new Error('Body of request invalid - must include name, description, and completed!')
        error.status = 400
        next(error)
    }
}

module.exports = {
    checkId, checkBody
}