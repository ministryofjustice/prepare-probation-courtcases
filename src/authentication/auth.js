const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2').Strategy
const config = require('../config.js')
const { generateOauthClientToken } = require('./oauth')
const log = require('../../log.js');

function authenticationMiddleware() {
  // eslint-disable-next-line
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }

    req.session.returnTo = req.originalUrl
    return res.redirect('/login')
  }
}

passport.serializeUser((user, done) => {
  // Not used but required for Passport
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // Not used but required for Passport
  done(null, user)
})


passport.use(new OAuth2Strategy(
  {
    authorizationURL: `${config.delius.authExternalUrl}/oauth/authorize`,
    tokenURL: `${config.delius.authUrl}/oauth/token`,
    clientID: config.delius.apiClientId,
    clientSecret: config.delius.apiClientSecret,
    callbackURL: `${config.domain}/login/callback`,
    state: true,
    customHeaders: { Authorization: generateOauthClientToken() },
  }, (accessToken, refreshToken, params, profile, done) => {
    log.info(accessToken)
    return done(null, profile)
  }
))

module.exports.authenticationMiddleware = authenticationMiddleware;
