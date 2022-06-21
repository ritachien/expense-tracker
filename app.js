// Include modules and declare related variables
const express = require('express')

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
