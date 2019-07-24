import express from 'express';

// Top-level page router
const router = new express.Router();

// Home page
router.get('/', async (req, res) => {
  const data = {
    courtHouse: 'Sheffield Magistrates Court',
    dateOfAppearance: 'Wednesday, 24th July 2019',
    cases: [
      {
        listingNumber: 3,
        blockDescription: '10:00-10:30',
        defendant: {
          name: 'John Smith',
        },
        offences: [
          {
            title: 'Assault by beating',
          },
        ],
        delius: {
          status: 'Current (nps)',
        },
        session: {
          courtRoom: '2',
          startTime: '10:00',
          endTime: '10:30',
        },
      },
      {
        listingNumber: 2,
        blockDescription: '10:00-10:30',
        defendant: {
          name: 'Micky Smith',
        },
        offences: [
          {
            title: 'Assault by beating',
          },
        ],
        delius: {
          status: 'Known',
        },
        session: {
          courtRoom: '1',
          startTime: '10:20',
          endTime: '10:40',
        },
      },
    ],
  };
  res.render('list/views/list', data);
});

// Export as router
export default router;
