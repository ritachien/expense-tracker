// Include modules and declare related variabls
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }
})

module.exports = mongoose.model('Category', categorySchema)
