angular.module('tasks').config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/tasks', {
      templateUrl: 'tasks/views/list-tasks.clinet.view.html'
    }).
    when('/tasks/create', {
      templateUrl: 'tasks/views/form-task.client.view.html'
    }).
    when('/tasks/:taskId', {
      templateUrl: '/tasks/views/view-task.client.view.html'
    }).
    when('/tasks/:taskId/edit', {
      templateUrl: '/tasks/view/form-task.client.view.html'
    });
  }
]);
