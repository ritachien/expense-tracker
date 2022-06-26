// Include modules
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

// Routes for login ===============================
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// Routes for logout ===============================
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

// Routes for register ===============================
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const error_msg = []

    // Check form filling errors
    // Case: Any block remains blank
    if (!name || !email || !password || !confirmPassword) {
      error_msg.push({ message: 'Email、密碼及確認密碼欄位都是必填。' })
    }

    // Case: Password is different from confirmPassword
    if (password !== confirmPassword) {
      error_msg.push({ message: '密碼與確認密碼不相符！' })
    }

    // Render error_msgs if fit any cases above
    if (error_msg.length) {
      return res.render('register', {
        error_msg,
        name,
        email,
        password,
        confirmPassword
      })
    }

    // Check if email has registered
    const user = await User.findOne({ email })
    // Case: If email is registered
    if (user) {
      error_msg.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', { error_msg, name, email })
    }

    // Case: Email is not yet registered
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    return res.redirect('/')

  } catch (err) {
    console.log(err)
  }


})

module.exports = router
