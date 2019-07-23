require('dotenv').config();

const production = process.env.NODE_ENV === 'production';

function get(name, fallback, options = {}) {
  if (process.env[name]) {
    return process.env[name]
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

module.exports = {
  port: 3000,
  sessionSecret: get('SESSION_SECRET', 'app-insecure-default-session', { requireInProduction: true }),
  delius: {
    timeout: {
      response: 30000,
      deadline: 35000,
    },
    authUrl: get('DELIUS_AUTH_URL', 'https://delius-oauth2.apps.live-1.cloud-platform.service.justice.gov.uk/auth'),
    authExternalUrl: get('DELIUS_AUTH_EXTERNAL_URL', get('DELIUS_AUTH_URL', 'https://delius-oauth2.apps.live-1.cloud-platform.service.justice.gov.uk/auth')),
    apiClientId: get('API_CLIENT_ID', 'probation_in_court'),
    apiClientSecret: get('API_CLIENT_SECRET', 'clientsecret'),
    role: 'ROLE_RRBT001',
  },
  domain: `${get('AUTH_DOMAIN', 'http://localhost:3000', true)}`,
};
