const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },  // Change argument from default value
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })

        // Case: Email not yet registered
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }

        // If Email is not yet registered, check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, { message: 'Password incorrect.' })
        }
        return done(null, user)

      } catch (err) {
        console.log(err)
      }
    }
  ))

  // Serialize and deserialize
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
