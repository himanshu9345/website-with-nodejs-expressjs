const express = require('express');
// const path = require('path');

const jobsRoute = require('./jobs');
const linkedInRequestRoute = require('./linkedin');

// used express router
const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/jobs', jobsRoute());

  router.use('/linkedin', linkedInRequestRoute());

  return router;
};
