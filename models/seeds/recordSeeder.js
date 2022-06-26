const bcrypt = require('bcryptjs')
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
    await User.find({ seed: true }).deleteMany()
    await Record.find({ seed: true }).deleteMany()

    // Create user
    await Promise.all(userSeeds.map(async (seed) => {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(seed.password, salt)
      const user = await User.create({
        name: seed.name,
        email: seed.email,
        password: hash,
        seed: true
      })
      console.log('Seed user created.')

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
          categoryId: category._id,
          seed: true
        })
      }))
      console.log('Records created.')
    }))

    // Success console then exit process
    console.log('Seeder finished.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
