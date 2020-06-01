const express = require('express');

// used express router
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response, next) => {
    try {
      // await will wait till promise returns, so fn is async
      const feedback = await feedbackService.getList();
      return response.json(feedback);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (request, response) => {
    response.send('Feedback posted');
  });
  return router;
};
