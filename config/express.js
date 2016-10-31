'use strict';
var express = require('express')
  , morgan = require('morgan')
  , compress = require('compression')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

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

  // set view engine as EJS
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  require('../app/routes/index.server.routes.js')(app);

  // set static files
  app.use(express.static('./public'));

  return app;
};
