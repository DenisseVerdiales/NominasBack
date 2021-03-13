'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const empleadosModelo = require('./../modelos/empleado-modelo');


router.post('/', validarToken, function (req, res) {
    var empleado = req.body;

    empleado.fechaCreacion = new Date();
    empleadosModelo.Crear(empleado, function (nuevo) {
      if (!nuevo) {
        return res.status(400).send("El empleado ingresado ya existe.");
      }
        respuestaModelo.status = 200;
        respuestaModelo.mensaje = "El Empleado se registró correctamente.";
        return res.status(200).send(respuestaModelo);
    
    }, function (error) {
      return res.status(501).send(error);
    });
  });




  module.exports = router;