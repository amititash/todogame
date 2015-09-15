'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToDoSchema = new Schema({
  todoname: String,
  todoowner: String,
  todoatt: String,
  todostatus: Boolean
});

module.exports = mongoose.model('ToDo', ToDoSchema);