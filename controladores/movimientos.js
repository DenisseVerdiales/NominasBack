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

  router.get('/movimientoId',validarToken, function (req, res) {
    movimientoEmpleadosModelo.ObtenerActivoPorID(req.query.id, function (movimiento) {
      if (movimiento)
        return res.status(200).send(movimiento);
      else
        return res.status(404).send();
    }, function (error) {
      return res.status(501).send(error);
    });
  });

  router.get('/movimientoFecha',validarToken, function (req, res) {
    movimientoEmpleadosModelo.ObtenerActivoPorFecha(req.query.fechaMovimiento, function (movimiento) {
      if (movimiento){
        return res.status(200).send(movimiento);
      }
      else
        return res.status(404).send();
    }, function (error) {
      return res.status(501).send(error);
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

router.put('/',validarToken, function (req, res) {
  var movimiento = req.body;
  movimiento.fechaModificacion = new Date();
  movimientoEmpleadosModelo.ActualizarPorID(movimiento, function () {
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Se actualizó correctamente la información del empleado.";
    return res.status(200).send(respuestaModelo);
  }, function (error) {
    return res.status(501).send(error);
  });
})

router.delete('/:id/:usuarioModificacionId',validarToken, function (req, res) {
  var movimiento = req.params;
  movimiento.FechaModificacion = new Date();
  movimientoEmpleadosModelo.DesactivarPorID(movimiento, function (respuesta) {
    if (!respuesta) {
      return res.status(404).send("No se encontró el movimiento.");
    }
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Se actualizó correctamente la información del movimiento.";
    return res.status(200).send(respuestaModelo);
  }, function (error) {
    return res.status(501).send(error);
  });
})


module.exports = router;