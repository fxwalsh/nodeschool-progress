'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProgressSchema = new Schema({
  name: String,
  completed: Array,
  current: String
});

module.exports = mongoose.model('Progress', ProgressSchema);