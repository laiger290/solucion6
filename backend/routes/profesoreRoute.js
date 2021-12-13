'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var profesorController = require('../controllers/profesorController');
// var autoController = require('../controllers/autoController');

// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/profesor', profesorController.guardar);
api.get('/profesor', profesorController.todos);



// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
