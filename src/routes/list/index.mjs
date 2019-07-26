import express from 'express';
import moment from 'moment'
import courtList from '../../services/courtList.mjs'
import logger from '../../../log.js'

// Top-level page router
const router = new express.Router();

// Home page
router.get('/', async (req, res) => {
  try {
    const { token } = req.session.passport.user
    const list = await courtList('2019-07-19', 'Sheffield Magistrates\' Court', token)
    logger.info(`Retrieved court list for ${list.courtHouse} on ${list.dateOfAppearance}`)
    res.render('list/views/list', {
      courtHouse: list.courtHouse,
      dateOfAppearance: moment(list.dateOfAppearance, 'YYYY-MM-DD').format('dddd, Do MMMM YYYY'),
      cases: flattenCases(list.sessions),
    });
  } catch (error) {
    logger.error(error)
    res.render('error', { error, message: 'Unable to retrieve court list' })
  }
});

const flattenCases = (sessions) => {
  const allCases = [];

  sessions.forEach((session) => {
    session.blocks.forEach((block) => {
      allCases.push(
        ...block.cases.map(aCase => ({
          ...aCase,
          session,
          block,
          delius: randomDeliusStatus(),
        }))
      )
    })
  })
  return allCases;
}


const randomDeliusStatus = () => {
  const rand = Math.random();
  return ({
    // eslint-disable-next-line no-nested-ternary
    status: rand > 0.3 ? 'Not known' : rand > 0.25 ? 'Current (crc)' : rand > 0.2 ? 'Current (nps)' : 'Known',
  })
}
// Export as router
export default router;
