const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

module.exports = app => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },  // Change argument from default value
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          // Case: Email not yet registered
          if (!user) {
            return done(null, false, { message: 'That email is not registered!' })
          }

          // Case: Wrong password
          if (user.password !== password) {
            return done(null, false, { message: 'Password incorrect.' })
          }

          // Case: Correct login arguments
          return (done(null, user))
        })
        .catch(err => done(err))
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
