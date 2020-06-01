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

  router.get('/', async (request, response, next) => {
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    // console.log(`Number of visits: ${request.session.visitcount}`);
    try {
      const speakers = await speakersService.getList();
      const allartwork = await speakersService.getAllArtwork();

      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        allartwork,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const speaker = await speakersService.getSpeaker(request.params.shortname);
      const allartwork = await speakersService.getArtworkForSpeaker(request.params.shortname);
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        allartwork,
      });
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
