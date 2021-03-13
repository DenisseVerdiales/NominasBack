'use strict';

const app = require('express');
const router = app.Router();
const validarToken = require('../utilidades/verificarToken');
const usuariosModelo = require('./../modelos/usuarios-modelo');

router.get('/', function(req, res){
  usuariosModelo.ObtenerTodos(function(usuario){
    return res.status(200).send(usuario);
  }, function(error){
    return res.status(404).send(error);
  });
});



module.exports = router;