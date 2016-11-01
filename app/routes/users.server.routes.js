'use strict';

var users = require('../controllers/users.server.controller');

module.exports = function (app) {
  // user create
  app.route('/users')
    .post(users.create)
    .get(users.list);

  app.route('/users/:id')
    .get(user.read);

  app.param('userId', users.userbyID);
};
