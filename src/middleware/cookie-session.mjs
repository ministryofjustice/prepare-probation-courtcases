import session from 'client-sessions';

// Support cookie sessions
const middleware = session({
  cookieName: 'session',

  // Maximum 24 hour expiry (sliding 7 hour extension)
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 7 * 60 * 60 * 1000,
  secret: 'CHANGE ME',
});

// Export as middleware
export default (req, res, next) => middleware(req, res, next);
