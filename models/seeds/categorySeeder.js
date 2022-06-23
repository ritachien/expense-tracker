const db = require('../../config/mongoose')
const Category = require('../category')
const CategorySeeds = require('./seedData/categorySeeds.js')

// Create seed data to database
db.once('open', async () => {
  try {
    // Clear old seeds
    await Category.find().deleteMany()
    // Create new seeds
    await Category.create(CategorySeeds)
    console.log('Category seeds created.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})



