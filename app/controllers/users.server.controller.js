'use strict';
// Invoke the user model
var mongoose = require('mongoose')
, User = mongoose.model('User');

exports.create = function(req, res, next) {
  var user = new User(req.body);

  // User create and save to mongodb
  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};
