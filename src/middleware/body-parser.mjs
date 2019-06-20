import bodyParser from 'body-parser';

// Parse form body from POST
const middleware = bodyParser.urlencoded({ extended: true });

// Export as middleware
export default (req, res, next) => middleware(req, res, next);
