const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// Create new record
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

// Update record
router.get('/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const categories = await Category.find().lean().sort('id')
    const record = await Record.findById(id).lean()
    const recordCategory = await Category.findById(record.categoryId).lean()
    record.category = recordCategory.name
    res.render('edit', { categories, record })
  } catch (err) {
    console.log(err)
  }
})

router.post('/:id', async (req, res) => {
  try {
    const { name, date, amount, categoryId } = req.body
    const userId = req.user._id
    const _id = req.params.id
    await Record.findOneAndUpdate({ _id, userId }, {
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
