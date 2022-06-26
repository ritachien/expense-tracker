// Include modules of Express
const express = require('express')
const router = express.Router()

// Includes routers module
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')
const { authenticator } = require('../middlewares/auth')

router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

// Export module
module.exports = router
