'use strict';
const app = require('express');
const router = app.Router();
const respuestaModelo = require('./../modelos/respuesta-modelo');
const validarToken = require('../utilidades/verificarToken');
const rolModelo = require('./../modelos/rol-modelo');


router.get('/', validarToken,function (req, res) {
    rolModelo.ObtenerActivos(function (rol) {
      return res.status(200).send(rol);
    }, function (error) {
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "No se encontraron los Roles";
      respuestaModelo.icono="warning"
      return res.status(404).send(respuestaModelo);
    });
});





  module.exports = router;