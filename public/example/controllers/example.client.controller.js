angular.module('example').controller('ExampleController', ['$scope', 'authentication', function($scope, authentication) {

    $scope.name = authentication.user ? authentication.user.userFullName : 'GTask User';

}]);
