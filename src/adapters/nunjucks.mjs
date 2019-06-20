import nunjucks from 'nunjucks';

// Add view engine
const adapter = (express) => {
  nunjucks.configure([
    './node_modules/govuk-frontend',
    './node_modules/govuk-frontend/components',
    './routes',
    './views',
  ], { express });

  // View engine file extension
  express.set('view engine', 'njk');
};

// Export as adapter
export default adapter;
