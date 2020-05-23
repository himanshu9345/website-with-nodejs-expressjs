const express = require('express');
// const path = require('path');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

// const jobsRoute = require('./jobs');
// const linkedInRequestRoute = require('./linkedin');

// used express router
const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  // router.use('/jobs', jobsRoute());

  // router.use('/linkedin', linkedInRequestRoute());

  return router;
};
