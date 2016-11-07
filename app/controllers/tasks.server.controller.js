var mongoose = require('mongoose'),
    Task = mongoose.model('Task');

// Error handling method
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in  err.errors) {
      if (err.errors[errName].message) {
        return err.errors[err.Name].message;
      } else {
      return 'Unknown server error';
      }
    }
  };
};
  // Task create module
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.creator = req.user;

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

// Task list
exports.list = function(req, res) {
  Task.find().sort('-created').populate('createor', 'firstName lastname fullName').exec(function(err, tasks) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
    res.json(tasks)
    }
  });
};

// app.param middleware
exports.taskByID = function(req, res, next, id) {
  Task.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, task) {
    if (err) return next(err);
    if (!task) return next(new Error('Failed to load task ' + id));

    req.task = task;
    next();
  });
};

// Task read method
exports.read = function(req, res) {
  res.json(req.task);
};

// Task update
exports.update = function(req, res) {
  var task = req.task;

  task.title = req.body.title;
  task.content = req.body.content;
  task.polit = req.body.polit;
  task.dueDate = req.body.dueDate;
  task.finishDate = req.body.finishDate;

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

// Task delete
exports.delete = function(req, res) {
  var task = req.task;

  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        messages: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

// Implementing an authorization middleware
exports.hasAuthorization = function(req, res, next) {
if (req.task.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
}
next();
};
