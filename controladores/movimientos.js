'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const movimientoEmpleadosModelo = require('./../modelos/movimientoEmpleado-modelo');
const respuestaModelo = require('./../modelos/respuesta-modelo');

router.get('/', validarToken,function (req, res) {
    movimientoEmpleadosModelo.ObtenerActivos(function (movimiento) {
      return res.status(200).send(movimiento);
    }, function (error) {
      return res.status(404).send(error);
    });
  });

router.post('/', validarToken, function (req, res) {
    var movimiento = req.body;
    movimiento.activo= true;
    movimiento.fechaCreacion = new Date();
    movimientoEmpleadosModelo.Crear(movimiento, function (nuevo) {
      if (!nuevo) {
        return res.status(400).send("El movimiento ingresado ya existe.");
      }
      respuestaModelo.status = 200;
      respuestaModelo.mensaje = "El movimiento se registró correctamente.";
      return res.status(200).send(respuestaModelo);
    
    }, function (error) {
      return res.status(501).send(error);
    });
});


module.exports = router;