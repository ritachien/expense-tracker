// Includes modules and declare related variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('MondoDB connecting error!')
})

db.once('open', () => {
  console.log('MondoDB connected!')
})

module.exports = db
