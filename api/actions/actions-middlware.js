// add middlewares here related to actions
const data = require('./actions-model')

function checkId (req, res, next) {
    const { id } = req.params

    data.get(id)
    .then(res => {
        console.log('id?', res)
        next()
    })
    .catch(err => {
        res.locals.error = 'Project of id: ' + id + ' does not exist!'
        err.status = 404
        next(err)
    })
}

module.exports = {
    checkId
}