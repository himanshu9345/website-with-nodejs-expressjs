const express = require('express');

// used express router
const router = express.Router();

module.exports = (params) => {
  // destructuring of params
  const { speakersService } = params;
  // router.get('/', async (request, response) => {
  //   const speakers = await speakersService.getList();
  //   return response.json(speakers);
  // });

  router.get('/', async (request, response) => {
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    // console.log(`Number of visits: ${request.session.visitcount}`);
    const speakers = await speakersService.getList();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  router.get('/:shortname', async (request, response) => {
    const speaker = await speakersService.getSpeaker(request.params.shortname);
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers-detail', speaker });
  });
  return router;
};
