const express = require('express');
const path = require('path');

// const speakersRoute = require('./addjob');

// used express router
const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  //   router.get('/speakers', (request, response) => {
  //     response.render('static/speakers');
  //     // response.sendFile(path.join(__dirname, ));
  //   });

  return router;
};
