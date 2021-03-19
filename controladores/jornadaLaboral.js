'use strict';
const app = require('express');
const router = app.Router();
const respuestaModelo = require('./../modelos/respuesta-modelo');
const validarToken = require('../utilidades/verificarToken');
const jornadaLaboralModel = require('./../modelos/jornadaLaboral-modelo');


router.get('/', validarToken,function (req, res) {
    jornadaLaboralModel.ObtenerActivos(function (jornadaLaboral) {
      return res.status(200).send(jornadaLaboral);
    }, function () {
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "No se encontraron las Jornadas Laborales";
      respuestaModelo.icono="warning"
      return res.status(404).send(respuestaModelo);
    });
});




  module.exports = router;