'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var personas_asignatura = require('../controllers/persona_asignaturaController');
 
// Llamamos al router
var api = express.Router();
 
//  Guardar Autos
api.post('/persona_asignatura', personas_asignatura.guardarAsignatura_persona);
api.get('/persona_asignatura', personas_asignatura.listar);

// Exportamos la configuración
module.exports = api;
