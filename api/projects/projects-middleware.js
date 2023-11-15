// add middlewares here related to projects
const data = require('./projects-model')

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

/**
 * function checkBody (req, res, next) {
    const { name, description, completed} = req.body


}
 */


module.exports = {
    checkId
}