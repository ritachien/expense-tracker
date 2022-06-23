// Include modules and declare related variabls
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)
