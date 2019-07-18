const config = require('../config.js')

function generateOauthClientToken() {
  return generate(config.delius.apiClientId, config.delius.apiClientSecret)
}

function generate(clientId, clientSecret) {
  const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  return `Basic ${token}`
}

module.exports = {
  generateOauthClientToken,
  generate,
}
