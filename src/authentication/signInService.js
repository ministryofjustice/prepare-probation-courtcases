const log = require('../../log')

module.exports.getUser = (token, refreshToken, expiresIn, username) => {
  log.info(`User profile for: ${username}`)

  return {
    token,
    refreshToken,
    username,
  }
}
