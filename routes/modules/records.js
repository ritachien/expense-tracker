const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// Create new record
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort('id')
    const today = new Date()
    const date = today.toJSON().toString().slice(0, 10)
    res.render('edit', { categories, date })
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
    record.date = record.date.toJSON().toString().slice(0, 10)
    res.render('edit', { categories, record })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
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

// Delete record
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Record.findOneAndDelete({ _id, userId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
