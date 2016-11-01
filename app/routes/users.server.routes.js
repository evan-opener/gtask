'use strict';

var users = require('../controllers/users.server.controller');

module.exports = function (app) {
  // user create
  app.route('/users').post(users.create);
};
