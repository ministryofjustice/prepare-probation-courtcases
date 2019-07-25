import request from 'superagent'
import logger from '../../log.js'
import config from '../config'

const apiUrl = config.apis.courtList.url


const getCourtList = (dateOfHearing, courtName, cb, errorCb) => {
  request
    .get(`${apiUrl}/court/${courtName}/list`)
    .query({ date: dateOfHearing })
    .set('Accept', 'application/json')
    .then((result) => {
      cb(result.body)
    })
    .catch((error) => {
      logger.error(error)
      errorCb(error)
    })
}

export default getCourtList
