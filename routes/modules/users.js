// Include modules
const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

// Routes for login ===============================
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// Routes for register ===============================
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // Check if email has registered
  const user = await User.findOne({ email })
  if (user) {
    console.log('Email already registered.')
    res.render('register', { name, email })
  }
  if (!user) {
    if (password !== confirmPassword) {
      res.render('register', { name, email })
    } else {
      await User.create({ name, email, password })
      res.redirect('/')
    }
  }
})

module.exports = router
