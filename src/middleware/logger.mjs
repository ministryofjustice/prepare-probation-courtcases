import bunyanLog from 'bunyan-request-logger';

const logger = bunyanLog();

// const logger = require('../../log.js');

const log = logger.requestLogger();

// Export as logger
export default (req, res, next) => log(req, res, next);
