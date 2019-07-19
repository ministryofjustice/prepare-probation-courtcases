import passport from 'passport';

export function middleware() {
  passport.initialize()
  passport.session();
}

// Export as middleware
export default (req, res, next) => middleware(req, res, next);
