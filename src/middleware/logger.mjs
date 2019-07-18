import bunyanLog from 'bunyan-request-logger';

const logger = bunyanLog();

// const logger = require('../../log.js');

const middleware = logger.requestLogger();

// Export as middleware
export default (req, res, next) => middleware(req, res, next);
