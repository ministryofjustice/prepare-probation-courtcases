import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import config from '../config.js';
import log from '../../log.js';

export function middleware() {
  passport.initialize()
  passport.session();
}


// Export as middleware
export default (req, res, next) => middleware(req, res, next);
