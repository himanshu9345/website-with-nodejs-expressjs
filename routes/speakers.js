const express = require('express');

// used express router
const router = express.Router();

module.exports = (params) => {
  // destructuring of params
  const { speakersService } = params;
  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    return response.json(speakers);
  });
  router.get('/:jobid', (request, response) => {
    response.send(`Detail page of ${request.params.jobid}`);
  });
  return router;
};
