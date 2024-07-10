const express = require('express')
const router = express.Router()
const userroite = require('./user')

router.use('/user', userroite)

module.exports = router