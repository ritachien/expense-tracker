// Include modules of Express
const express = require('express')
const router = express.Router()

// Includes routers module
const home = require('./modules/home')

router.use('/', home)

// Export module
module.exports = router
