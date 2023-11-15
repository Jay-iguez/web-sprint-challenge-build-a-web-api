// add middlewares here related to actions
const data = require('./actions-model')

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

module.exports = {
    checkId
}