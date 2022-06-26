const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

// Routes for Account =====================================
router.get('/', (req, res) => {
  const user = req.user
  res.render('account', { user })
})

router.put('/', (req, res) => {
  const id = req.user._id
  const { name, password, confirmPassword } = req.body

  // If no update to password
  if (!password && !confirmPassword) {
    return User.findByIdAndUpdate(id, { name })
      .then(() => {
        req.flash('success_msg', 'Update succeed!')
        res.redirect('/account')
      })
      .catch(err => console.log(err))
  }

  // If update password or confirmPassword
  if (passport || confirmPassword) {
    // If password NOT EQUALS confirmPassword
    if (password !== confirmPassword) {
      req.flash('error_msg', { message: '密碼與確認密碼不相符！' })
      return res.redirect(`/account`)
    }
    // If password EQUALS confirmPassword
    if (password === confirmPassword) {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.findByIdAndUpdate(id, {
          name,
          password: hash
        }))
        .then(() => {
          req.flash('success_msg', 'Update succeed!')
          res.redirect('/account')
        })
        .catch(err => console.log(err))
    }
  }
})

module.exports = router
