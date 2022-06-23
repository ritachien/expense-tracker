// Include modules of Express
const express = require('express')
const router = express.Router()

// Includes routers module
const home = require('./modules/home')
const users = require('./modules/users')

router.use('/', home)
router.use('/users', users)

// Export module
module.exports = router
