// Include modules and declare related variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
require('./config/mongoose')

const app = express()
const PORT = 3000

// Routes
app.get('/', (req, res) => {
  res.send('App to manage self expense!')
})

// Server listening
app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost/${PORT}`)
})
