import app from './index.mjs';
import * as routes from './routes/index.mjs';

// Add top-level routes
app.use(routes.home);


// Add nested routes
app.use('/offender', routes.offender);

// Start on port
app.listen(3000);

// Export server (with routes)
export default app;
