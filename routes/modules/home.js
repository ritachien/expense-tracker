// Include modules of Express
const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    let totalAmount = 0
    // Get category data from database
    const categoryFromDb = await Category.find().lean()
    const category = {}
    categoryFromDb.forEach(item => category[item._id] = item)

    // Get records from database and
    const recordsFromDb = await Record.find().lean()
    const records = []
    recordsFromDb.forEach(item => {
      //  Get related icon
      item.icon = category[item.categoryId].icon
      // Format date
      item.date = dayjs(item.date).format('YYYY-MM-DD')

      records.push(item)
      totalAmount += item.amount
    })

    // Render page
    res.render('index', { totalAmount, records })

  } catch (err) {
    console.log(err)
  }
})

// Export module
module.exports = router
