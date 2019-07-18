import express from 'express';
import passport from 'passport';
import config from '../../config.js';


// Top-level page router
const router = new express.Router();

router.get('/', passport.authenticate('oauth2'))

router.get('/callback', (req, res, next) => passport.authenticate('oauth2', {
  successReturnToOrRedirect: req.session.returnTo || '/',
  failureRedirect: '/autherror',
})(req, res, next))

// Export as router
export default router;
