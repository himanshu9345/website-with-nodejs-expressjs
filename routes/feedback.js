const express = require('express');
// check - routing middle ware
const { check, validationResult } = require('express-validator');
// used express router
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;
      request.session.feedback = {};

      // console.log(allartwork);
      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
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

  router.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email address is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
    ],
    (request, response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }

      console.log(request.body);
      response.send('Feedback posted');
    }
  );
  return router;
};
