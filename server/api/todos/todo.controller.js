/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Todos              ->  index
 * POST    /Todos              ->  create
 * GET     /Todos/:id          ->  show
 * PUT     /Todos/:id          ->  update
 * DELETE  /Todos/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var todo = require('./todo.model');

// Get list of todos
exports.index = function(req, res) {
  todo.find(function (err, todos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(todos);
  });
};

// Get list of todos by a user
exports.showbyuser = function(req, res) {
	console.log("checking");
  todo.find({
	  
	  "todoowner": req.params.email
	  
	  }, function (err, todos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(todos);
  });
};


// Get a single todo
exports.show = function(req, res) {
  todo.findById(req.params.id, function (err, todo) {
    if(err) { return handleError(res, err); }
    if(!todo) { return res.status(404).send('Not Found'); }
    return res.json(todo);
  });
};

// Creates a new todo in the DB.
exports.create = function(req, res) {
  todo.create(req.body, function(err, todo) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(todo);
  });
};

// Updates an existing todo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  todo.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}