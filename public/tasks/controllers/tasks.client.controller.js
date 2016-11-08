angular.module('tasks').controller('TasksController', ['$scope', '$routeParams', '$location', 'Authentication', 'Tasks', function($scope, $routeParams, $location, Authentication, Tasks) {

  // Task create
  $scope.create = function() {
    var task = new Tasks({
      title: this.title,
      content: this.content,
      polit: this.polit,
      dueDate: this.dueDate,
      finishDate: this.finishDate
    });

    task.$save(function(response) {
      $location.path('tasks/' + response._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Task list
  $scope.find = function() {
    $scope.tasks = Tasks.query();
  };

  // Read one task
  $scope.findOne = function() {
    $scope.task = Tasks.get({
      taskId: $routeParams.taskId
    });
  };

  // Task update
  $scope.update = function() {
    $scope.task.$update(function() {
      $location.path('tasks/' + $scope.task._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Task delete
  $scope.delete = function(task) {
      if (task) {
        task.$remove(function() {
          for (var i in $scope.tasks) {
            if ($scope.tasks[i] === task) {
              $scope.tasks.splice(i, 1);
            }
          }
        });
      } else {
        $scope.task.$remove(function() {
          $location.path('tasks');
        });
      }
    };

}]);
