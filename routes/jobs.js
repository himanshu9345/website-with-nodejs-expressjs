const express = require('express');

// used express router
const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.send('Jobs page');
  });
  router.get('/:jobid', (request, response) => {
    response.send(`Jobs details for job id ${request.params.jobid}`);
  });
  return router;
};
