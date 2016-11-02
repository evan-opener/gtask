'use strict';

// invoke mongoose and schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

// A validation function for local stragtegy properties
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

// A validation function for local strategy email
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

// Define user schema
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address'],
    index: true
  },
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    lowercase: true,
    trim: true
  },
  password: String,
  created: {
    type: Date,
    default: Date.now
  }
});

// add virtual attributes for full name
UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});


// A user post middleware
UserSchema.post('save', function(next) {
  if(this.isNew) {
    console.log('A new user was created.');
  } else {
    console.log('A user updated is details.');
  }
});

// Metho for authenticating user
UserSchema.methods.authenticate = function(password) {
  return this.password === password;
};

//Custom static mehods for find by username
UserSchema.statics.findOneByUsername = function (username, callback) {
  this.findOne({ useranme: new RegExp(username, 'i') }, callback);
};

UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
