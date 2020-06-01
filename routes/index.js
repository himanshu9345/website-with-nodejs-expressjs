const express = require('express');
// const path = require('path');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

// const jobsRoute = require('./jobs');
// const linkedInRequestRoute = require('./linkedin');

// used express router
const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const topSpeakers = await speakersService.getList();
      const allartwork = await speakersService.getAllArtwork();
      // console.log(allartwork);
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        allartwork,
      });
    } catch (error) {
      return next(error);
    }
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    // console.log(`Number of visits: ${request.session.visitcount}`);
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  // router.use('/jobs', jobsRoute());

  // router.use('/linkedin', linkedInRequestRoute());

  return router;
};
