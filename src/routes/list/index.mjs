import express from 'express';
import courtList from '../../services/courtList'
import logger from '../../../log'

// Top-level page router
const router = new express.Router();

// Home page
router.get('/', async (req, res) => {
  courtList(
    '2019-07-19',
    'Sheffield Magistrates\' Court',
    (list) => {
      logger.info(list)
      res.render('list/views/list', {
        courtHouse: list.courtName,
        dateOfAppearance: 'Friday, 19th July 2019',
        cases: flattenCases(list.sessions),
      });
    },
    (error) => {
      logger.error(error)
      res.render('error', { error, message: 'Unable to retrieve court list' })
    }
  )
});

const flattenCases = (sessions) => {
  const allCases = [];

  sessions.forEach((session) => {
    session.blocks.forEach((block) => {
      allCases.push(
        ...block.cases.map(aCase => Object.assign({}, aCase, {
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
