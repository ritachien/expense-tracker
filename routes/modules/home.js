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
    const categoryId = req.query.categorySelect || ''
    const categories = await Category.find().sort('_id').lean()

    // Get records
    let records
    if (categoryId) {
      records = await Record.find({ userId, categoryId }).lean()
    } else {
      records = await Record.find({ userId }).lean()
    }

    // Process each record for icon and date format
    for (let item of records) {
      categories.filter(category => {
        if ((category._id).toString() === (item.categoryId).toString()) {
          item.icon = category.icon
        }
      })
      item.date = item.date.toJSON().toString().slice(0, 10)
      totalAmount += item.amount
    }

    // Process categories for filter
    categories.forEach(item => {
      if (item._id.toString() === categoryId) {
        item.selected = 'selected'
      }
    })

    // Render page
    return res.render('index', { records, totalAmount, categories })

  } catch (err) {
    console.log(err)
  }
})

// Export module
module.exports = router
