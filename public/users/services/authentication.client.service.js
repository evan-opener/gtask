angular.module('users').factory('authentication', [function() {
  this.user = window.user;

  return {
    user: this.user
  };
}]);
