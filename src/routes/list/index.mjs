import express from 'express';
import ensureLoggedIn from 'connect-ensure-login';

// Top-level page router
const router = new express.Router();

// Home page
router.get('/', async (req, res) => {
  res.render('list/views/list');
});

// Export as router
export default router;
