const express = require('express');

// used express router
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();
      // console.log(allartwork);
      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
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

  // router.get('/', async (request, response, next) => {
  //   try {
  //     // await will wait till promise returns, so fn is async
  //     const feedback = await feedbackService.getList();
  //     return response.json(feedback);
  //   } catch (error) {
  //     return next(error);
  //   }
  // });

  router.post('/', (request, response) => {
    console.log(request.body);
    response.send('Feedback posted');
  });
  return router;
};
