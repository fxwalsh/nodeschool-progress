/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /progress              ->  index
 * POST    /progress              ->  create
 * GET     /progress/:id          ->  show
 * PUT     /progress/:id          ->  update
 * DELETE  /progress/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Progress = require('./progress.model');

// Get list of progress
exports.index = function(req, res) {
  Progress.find(function (err, progress) {
    if(err) { return handleError(res, err); }
    return res.json(200, progress);
  });
};

// Get a single progress
exports.show = function(req, res) {
  Progress.findById(req.params.id, function (err, progress) {
    if(err) { return handleError(res, err); }
    if(!progress) { return res.send(404); }
    return res.json(progress);
  });
};

// Creates a new progress in the DB.
exports.create = function(req, res) {
  Progress.create(req.body, function(err, progress) {
    if(err) { return handleError(res, err); }
    return res.json(201, progress);
  });
};

// Updates an existing progress in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Progress.findById(req.params.id, function (err, progress) {
    if (err) { return handleError(res, err); }
    if(!progress) { return res.send(404); }
    var updated = _.merge(progress, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, progress);
    });
  });
};

// Upserts, by name, an existing progress in the DB. 
exports.updateByName = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Progress.findOneAndUpdate({ 'name': req.body.name }, req.body, {upsert:true}, function (err, progress) {
    if (err) { return handleError(res, err); }
      return res.json(200, progress);
  });
};

// Deletes a progress from the DB.
exports.destroy = function(req, res) {
  Progress.findById(req.params.id, function (err, progress) {
    if(err) { return handleError(res, err); }
    if(!progress) { return res.send(404); }
    progress.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}