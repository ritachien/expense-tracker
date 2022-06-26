// Include modules of Express
const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// Render all record items
router.get('/', async (req, res) => {
  try {
    let totalAmount = 0
    const userId = req.user._id
    // Get all category data from database
    const categoryFromDb = await Category.find().lean()
    const category = {}
    categoryFromDb.forEach(item => category[item._id] = item)

    // Get records from database and
    const recordsFromDb = await Record.find({ userId }).lean()
    const records = []
    recordsFromDb.forEach(item => {
      //  Get related icon
      item.icon = category[item.categoryId].icon
      // Format date
      item.date = item.date.toJSON().toString().slice(0, 10)

      records.push(item)
      totalAmount += item.amount
    })

    // Render page
    res.render('index', { totalAmount, records, categoryFromDb })

  } catch (err) {
    console.log(err)
  }
})

// Render records by selected category
router.post('/', async (req, res) => {
  let totalAmount = 0
  const userId = req.user._id
  const categoryId = req.body.categorySelect
  // Get all category data from database
  const categoryFromDb = await Category.find().lean()
  const category = {}
  categoryFromDb.forEach(item => category[item._id] = item)
  const categorySelected = category[categoryId].name
  // Get records from database and
  const recordsFromDb = await Record.find({ userId, categoryId }).lean()
  const records = recordsFromDb
  records.forEach(item => {
    //  Get related icon
    item.icon = category[item.categoryId].icon
    // Format date
    item.date = dayjs(item.date).format('YYYY-MM-DD')
    totalAmount += item.amount
  })

  // Render page
  res.render('index', { totalAmount, records, categoryFromDb, categorySelected })


})

// Export module
module.exports = router
