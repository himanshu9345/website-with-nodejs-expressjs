const credentials = {
  client: {
    id: '',
    secret: '',
  },
  auth: {
    tokenHost: 'https://www.linkedin.com/oauth/v2/authorization',
  },
};

const oauth2 = require('simple-oauth2').create(credentials);

const express = require('express');

// used express router
const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('pages/linkedinSignin', { pageTitle: 'Welcome' });
  });

  router.get('/redirect', (request, response) => {
    const redirectUri = oauth2.authorizationCode.authorizeURL({
      response_type: 'code',
      redirect_uri: 'http://localhost:3000/linkedin/callback',
      scope: 'r_liteprofile',
    });

    response.redirect(redirectUri);
  });

  router.get('/callback', (request, response) => {
    console.log('linkedin-callback route invoked');

    response.send('linked in callback working');
  });
  return router;
};
