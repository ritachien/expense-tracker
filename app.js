// Include modules and declare related variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const PORT = 3000

// View engine
app.engine('hbs', exphbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// Middleware
app.use(express.static('public'))

// Routes
app.use(routes)

// Server listening
app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost/${PORT}`)
})
