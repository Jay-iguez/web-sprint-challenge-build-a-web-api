// Write your "projects" router here!
const express = require('express')
const projects = express.Router()

projects.get('/', async (req, res) => {
    res.status(200).json({
        message: "The sugar runs dry."
    })
})

module.exports = projects