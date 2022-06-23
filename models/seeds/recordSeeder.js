const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const userSeeds = require('./seedData/userSeeds')
const recordSeeds = require('./seedData/recordSeeds')

// Create seed data to database
db.once('open', async () => {
  try {
    // Delete old seeds
    await User.find().deleteMany()
    await Record.find().deleteMany()

    // Create user
    const user = await User.create(...userSeeds)
    // Create each records
    await Promise.all(recordSeeds.map(async (seed) => {
      // Find categoryId of the record
      const category = await Category.findOne({ name: seed.category }).lean()
      // Give userId and categoryId to record
      await Record.create({
        name: seed.name,
        amount: seed.amount,
        date: seed.date,
        userId: user._id,
        categoryId: category._id
      })
    }))

    // Success console then exit process
    console.log('Seed user and records created.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
