var users = require('../../app/controllers/users.server.controller'),
    tasks = require('../../app/controllers/tasks.server.controller');

module.exports = function(app) {
  app.route('/api/tasks')
    .get(tasks.list)
    .post(users.requireLogin, tasks.create);

  app.route('/api/tasks/:taskId')
    .get(tasks.read)
    .put(users.requireLogin, tasks.hasAuthorization, tasks.update)
    .delete(users.requireLogin, tasks.hasAuthorization, tasks.delete);

  app.param('taskId', tasks.taskByID);
};
