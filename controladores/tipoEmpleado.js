'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const tipoEmpleadoModelo = require('./../modelos/tipoEmpleado-modelo');


router.get('/', function (req, res) {
    tipoEmpleadoModelo.ObtenerActivos(function (tipoEmpleado) {
      return res.status(200).send(tipoEmpleado);
    }, function (error) {
      console.log("error",error);
      return res.status(404).send(error);
    });
});




  module.exports = router;