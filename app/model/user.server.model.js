'use strict';

// invoke mongoose and schema
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Define user schema
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String
});

mongoose.model('User', UserSchema);
