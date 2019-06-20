import express from 'express';
import * as adapters from './adapters/index.mjs';
import * as middleware from './middleware/index.mjs';

// Express app
const app = express();

// Add adapters
adapters.directory(app);
adapters.nunjucks(app);

// Add middleware
app.use('/assets', middleware.assets);
app.use(middleware.static);
app.use(middleware.bodyParser);
app.use(middleware.cookieSession);

// Export server
export default app;
