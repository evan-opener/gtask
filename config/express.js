'use strict';

var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('dve'));
  } else {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    entended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  require('../app/routes/index.server.routes.js')(app);
  return app;
};
