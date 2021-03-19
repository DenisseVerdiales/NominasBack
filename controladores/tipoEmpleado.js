'use strict';
const app = require('express');
const router = app.Router();
const respuestaModelo = require('./../modelos/respuesta-modelo');
const validarToken = require('../utilidades/verificarToken');
const tipoEmpleadoModelo = require('./../modelos/tipoEmpleado-modelo');


router.get('/', validarToken,function (req, res) {
    tipoEmpleadoModelo.ObtenerActivos(function (tipoEmpleado) {
      return res.status(200).send(tipoEmpleado);
    }, function () {
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "No se encontraron los Tipos de empleados";
      respuestaModelo.icono="warning"
      return res.status(404).send(respuestaModelo);
    });
});




  module.exports = router;