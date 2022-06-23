// Include modules and declare related variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const dayjs = require('dayjs')

const Record = require('./models/record')
const Category = require('./models/category')
require('./config/mongoose')

const app = express()
const PORT = 3000

// View engine
app.engine('hbs', exphbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// Middleware
app.use(express.static('public'))

// Routes
app.get('/', async (req, res) => {
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

// Server listening
app.listen(PORT, (req, res) => {
  console.log(`App is running on http://localhost/${PORT}`)
})
