import request from 'superagent'
import config from '../config.js'

const apiUrl = config.apis.courtList.url


const getCourtList = async (dateOfHearing, courtName, token) => {
  const result = await request
    .get(`${apiUrl}/court/${courtName}/list`)
    .query({ date: dateOfHearing })
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)

  return result.body
}

export default getCourtList
