import cookieSession from 'cookie-session';
import config from '../config.js'

// Support cookie sessions
const middleware = cookieSession({
  name: 'session',
  keys: [config.sessionSecret],
  maxAge: 60 * 60 * 1000,
  secure: config.https,
  httpOnly: true,
  signed: true,
  overwrite: true,
  sameSite: 'lax',
});

// Export as middleware
export default (req, res, next) => middleware(req, res, next);
