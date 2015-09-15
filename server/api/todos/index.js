'use strict';

var express = require('express');
var controller = require('./todo.controller');

// Requires multiparty 
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/showbyuser/:email', controller.showbyuser);

router.post('/todofile', multipartyMiddleware, controller.uploadFile);


module.exports = router;