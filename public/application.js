'use strict';
// Define the main mdoule name for this app
var mainApplicationModuleName = 'gtask';

// Use module method to create main application
// The other module can be inject as dependencies
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'nexample']);

// Make the route have the right url as /#!/xxx
mainApplicationModule.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

// Use angular.bootstrap method to initiate a new AngularJS application use the main application module.
angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
