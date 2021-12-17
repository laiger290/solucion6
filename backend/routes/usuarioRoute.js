'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var userController = require('../controllers/usuarioController');
// var autoController = require('../controllers/autoController');

const auth = require('../middlewares/auth')
// Llamamos al router
var api = express.Router();
 
//  Guardar usuario
api.post('/usuario', userController.guardar);
api.get('/usuario', auth.isAuth,userController.todos);
api.post('/usuario/validar', userController.validar);
api.post('/usuario/vigencia',auth.isAuth,userController.validaVigenciaUsuario);
//rutas para activar o desactivar usuario
api.get('/usuario/activar/:id', userController.activar);
api.get('/usuario/desactivar/:id', userController.desactivar);
//api.get('/usuario/estado', userController.p);

// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
