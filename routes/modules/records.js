const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort('id')
    res.render('edit', { categories })
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, date, amount, categoryId } = req.body
    const userId = req.user._id
    await Record.create({
      name,
      date,
      amount,
      categoryId,
      userId: userId
    })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
