const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');
// Services intialized by passsing data source
const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

// enable express to trust cookie passed through reverse proxy
app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['32452352hjskfnbdhfwrui45', 'dsfst4ew4442dfhwejkr'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// middleware
app.use(express.static(path.join(__dirname, './static')));

app.locals.siteName = 'ROUX  Meetups';

app.use(async (request, response, next) => {
  // response.locals.someVariable = 'hello';
  // return next();
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

// passing services as argument
app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express server listener on port ${port}`);
});
