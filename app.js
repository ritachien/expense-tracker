// Include modules and declare related variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = 3000

// View engine
app.engine('hbs', exphbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  next()
})
// Routes
app.use(routes)

// Server listening
app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost/${PORT}`)
})
