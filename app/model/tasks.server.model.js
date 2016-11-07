var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Define the task schema
var TaskSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    require: 'Title cannot be blank!'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  polit: {
    type: String
  },
  dueDate: {
    type: Date
  },
  finishDate: {
    type: Date
  }
});

mongoose.model('Task', TaskSchema);
