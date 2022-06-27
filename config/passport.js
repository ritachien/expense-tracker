const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // Initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // Set Local Strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
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

  // Set Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_clientID,
    clientSecret: process.env.FACEBOOK_clientSecret,
    callbackURL: process.env.FACEBOOK_callbackURL,
    profileFields: ['email', 'displayName']
  },
    async (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      const user = await User.findOne({ email })
      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      const newUser = await User.create({
        name,
        email,
        password: hash
      })
      return done(null, newUser)
    }
  ))

  // Set Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_clientID,
    clientSecret: process.env.GOOGLE_clientSecret,
    callbackURL: process.env.GOOGLE_callbackURL,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { name, email } = profile._json
      const user = await User.findOne({ email })

      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      const newUser = await User.create({ name, email, password: hash })
      return done(null, newUser)
    } catch (err) {
      console.log(err)
    }
  }
  ))

  // Serialize and deserialize
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (err) {
      console.log(err)
    }
  })
}
