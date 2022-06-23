// Include modules of Express
const express = require('express')
const router = express.Router()

// Includes routers module
const home = require('./modules/home')
const users = require('./modules/users')
const { authenticator } = require('../middlewares/auth')

router.use('/users', users)
router.use('/', authenticator, home)

// Export module
module.exports = router
