'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const tipoEmpleadoModelo = require('./../modelos/tipoEmpleado-modelo');


router.get('/', validarToken, function (req, res) {
    console.log("LLEGO");
    tipoEmpleadoModelo.ObtenerActivos(function (tipoEmpleado) {
      return res.status(200).send(tipoEmpleado);
    }, function (error) {
      return res.status(404).send(error);
    });
  });




  module.exports = router;