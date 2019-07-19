import passport from 'passport';
import app from './index.mjs';
import * as routes from './routes/index.mjs';
import config from './config.js';
// eslint-disable-next-line no-unused-vars
import auth from './authentication/auth.js';
import healthcheck from './services/healthcheck.js'

// token refresh
app.use(async (req, res, next) => {
  if (req.user) {
    const timeToRefresh = new Date() > req.user.refreshTime
    if (timeToRefresh) {
      req.session.returnTo = req.originalUrl
      return res.redirect('/login')
    }
  }
  return next()
})

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use((req, res, next) => {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

// eslint-disable-next-line consistent-return
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}

// healthcheck route
app.get('/health', (req, res, next) => {
  healthcheck((err, result) => {
    if (err) {
      return next(err)
    }
    if (!result.healthy) {
      res.status(503)
    }
    res.json(result)
    return result
  })
})

const authLogoutUrl = `${config.delius.authExternalUrl}/logout?client_id=${config.delius.apiClientId}&redirect_uri=${config.domain}`

app.get('/autherror', (req, res) => {
  res.status(401)
  return res.render('autherror', {
    authURL: authLogoutUrl,
  })
})

// Passport routes
app.get('/login', passport.authenticate('oauth2'))

app.get('/login/callback', (req, res, next) => passport.authenticate('oauth2', {
  successReturnToOrRedirect: req.session.returnTo || '/',
  failureRedirect: '/autherror',
})(req, res, next))

app.use('/logout', (req, res) => {
  if (req.user) {
    req.logout()
  }
  res.redirect(authLogoutUrl)
})

app.use(ensureAuthenticated);

// Add top-level routes
app.use(routes.list);

// Add nested routes

app.use('/offender', routes.offender);

// Start on port
app.listen(config.port);

// Export server (with routes)
export default app;
