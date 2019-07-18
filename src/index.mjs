import express from 'express';
import passport from 'passport';
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
app.use(middleware.logger);
// app.use(middleware.passport);
app.use(passport.initialize());
app.use(passport.session());


// Export server
export default app;
