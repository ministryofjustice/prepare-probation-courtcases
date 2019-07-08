import { config } from './config.mjs';
import app from './index.mjs';
import * as routes from './routes/index.mjs';
// eslint-disable-next-line import/no-unresolved

// Add top-level routes
app.use(routes.list);

// Add nested routes
app.use('/offender', routes.offender)

// Start on port
app.listen(config.port);

// Export server (with routes)
export default app;
