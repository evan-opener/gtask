'use strict';
var config = require('./config')
  , express = require('express')
  , morgan = require('morgan')
  , compress = require('compression')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , session = require('express-session');

module.exports = function () {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    entended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // config session
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  // set view engine as EJS
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  require('../app/routes/index.server.routes')(app);
  require('../app/routes/users.server.routes')(app);

  // set static files
  app.use(express.static('./public'));

  return app;
};
