// add middlewares here related to actions
const data = require('./actions-model')

const checkTypeOf = (value, type) => {
    return typeof value === type ? true : false
}

async function checkId(req, res, next) {
    const {id} = req.params

    const actions = await data.get(id)

    if (actions !== null) {
        next()
    } else {
        const error = new Error(`Action of ${id} does not exist!`)
        error.status = 404
        next(error)
    }
}

function checkBody(req, res, next) {
    const { project_id, description, notes, completed = false } = req.body

    if (checkTypeOf(project_id, 'number') && checkTypeOf(description, 'string') && checkTypeOf(notes, 'string') && checkTypeOf(completed, 'boolean')) {
        next()
    } else {
        const error = new Error('Body of request invalid - must include project id, description, and notes! Completed property optional.')
        error.status = 400
        next(error)
    }
}

module.exports = {
    checkId, checkBody
}