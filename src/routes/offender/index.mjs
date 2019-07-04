import express from 'express';

import logger from '../../../log.js';

// Top-level page router
const router = new express.Router();

// Home page
router.get('/', async (req, res) => {
  res.render('offender/views/offender');
  logger.info('/offender');
});


// Export as router
export default router;
