'use strict';

var users = require('../controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
  // user create
  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

  app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
  }));

  app.get('/signout', users.signout);
};
