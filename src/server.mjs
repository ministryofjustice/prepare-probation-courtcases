import passport from 'passport';
import jwtDecode from 'jwt-decode';
import app from './index.mjs';
import * as routes from './routes/index.mjs';
import config from './config.js';
// eslint-disable-next-line no-unused-vars
import auth from './authentication/auth.js';
import healthcheck from './services/healthcheck.js'
import log from '../log.js';
// import { unauthorisedError } from './utils/errors.js';
const production = process.env.NODE_ENV === 'production'



function addTemplateVariables(req, res, next) {
  res.locals.user = req.user
  next()
}

function unauthorisedError() {
  const error = new Error('Unauthorised access: required role not present')
  error.status = 403
  return error
}

app.use(addTemplateVariables)

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


// Make sure user is authenticated
// eslint-disable-next-line consistent-return
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}

// Make sure only users with court admin role can access court app
const authorisationMiddleware = (req, res, next) => {
  if (res.locals && res.locals.user && res.locals.user.token) {
    const roles = jwtDecode(res.locals.user.token).authorities;
    log.info(roles);
    if (!roles.includes(config.delius.role)) {
      return next(unauthorisedError())
    }

    return next()
  }
  // No session: get one created
  req.session.returnTo = req.originalUrl
  return res.redirect('/login')
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
app.use(authorisationMiddleware);

// Add top-level routes
app.use(routes.list);

// Add nested routes
app.use('/offender', routes.offender);

app.use((req, res, next) => {
  next(new Error('Not found'))
})

app.use(renderErrors);

// Start on port
app.listen(config.port);

// Export server (with routes)
export default app;


// eslint-disable-next-line no-unused-vars
function renderErrors(error, req, res, next) {
  // NOTE 'next' param MUST be included so that express recognises this as an error handler

  log.error(error)

  // code to handle unknown errors
  const prodMessage = 'Something went wrong. The error has been logged. Please try again'
  if (error.response) {
    res.locals.error = error.response.error
    res.locals.message = production ? prodMessage : error.response.res.statusMessage
  } else {
    res.locals.error = error
    res.locals.message = production ? prodMessage : error.message
  }
  res.status(error.status || 500)

  res.render('error')
}


