const express = require('express');

// used express router
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response) => {
    // await will wait till promise returns, so fn is async
    const feedback = await feedbackService.getList();
    return response.json(feedback);
  });
  router.get('/:jobid', (request, response) => {
    response.send(`Detail page of ${request.params.jobid}`);
  });
  return router;
};
