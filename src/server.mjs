import passport from 'passport';
import app from './index.mjs';
import * as routes from './routes/index.mjs';
import config from './config.js';
import auth from './authentication/auth.js';

const { authenticationMiddleware } = auth;


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

const authLogoutUrl = `${config.delius.authExternalUrl}/logout?client_id=${config.delius.apiClientId}&redirect_uri=${config.domain}`

app.get('/autherror', (req, res) => {
  res.status(401)
  return res.render('autherror', {
    authURL: authLogoutUrl,
  })
})

app.get('/login', passport.authenticate('oauth2', {
  session: true,
  successReturnToOrRedirect: '/',
}));

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

// app.get('/', passport.authenticate('oauth2'));

// Add top-level routes
app.use(routes.list, authenticationMiddleware);

// Add nested routes
// app.use('/login', routes.auth, authenticationMiddleware);
app.use('/offender', routes.offender, authenticationMiddleware);

// Start on port
app.listen(config.port);

// Export server (with routes)
export default app;
