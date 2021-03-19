'use strict';
const app = require('express');
const router = app.Router();
const moment = require("moment");
const validarToken = require('../utilidades/verificarToken');
const movimientoEmpleadosModelo = require('./../modelos/movimientoEmpleado-modelo');
const respuestaModelo = require('./../modelos/respuesta-modelo');

router.get('/', validarToken,function (req, res) {
    movimientoEmpleadosModelo.ObtenerActivos(function (movimiento) {
      return res.status(200).send(movimiento);
    }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al consultar los movimientos";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
    });
  });

  router.get('/movimientoId',validarToken, function (req, res) {
    movimientoEmpleadosModelo.ObtenerActivoPorID(req.query.id, function (movimiento) {
      if (movimiento)
        return res.status(200).send(movimiento);
      else{
        respuestaModelo.status = 404;
        respuestaModelo.mensaje = "No se encontró el movimiento";
        respuestaModelo.icono="warning";
        return res.status(404).send(respuestaModelo);
      }
    }, function () {
        respuestaModelo.status = 501;
        respuestaModelo.mensaje = "Ocurrió un error al consultar el movimiento";
        respuestaModelo.icono="error";
        return res.status(501).send(respuestaModelo);
    });
  });

  router.get('/movimientoFecha',validarToken, function (req, res) {
    var fecha = moment(req.query.fechaMovimiento)
    movimientoEmpleadosModelo.ObtenerActivoPorFecha(fecha, function (movimiento) {
      if (movimiento){
        return res.status(200).send(movimiento);
      }
      else{
        return res.status(404).send();
      }
    }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al consultar el movimiento";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
    });
  });

router.post('/', validarToken, function (req, res) {
    var movimiento = req.body;
   
    movimiento.activo= true;
    var date = moment(req.body.fechaMovimiento);
    movimiento.fechaCreacion = new Date();
    movimiento.fechaMovimiento = date;
    movimientoEmpleadosModelo.Crear(movimiento, function (nuevo) {
      if (!nuevo) {
        respuestaModelo.status = 400;
        respuestaModelo.mensaje = "El movimiento ingresado ya existe.";
        respuestaModelo.icono="error";
        return res.status(400).send(respuestaModelo);
      }
      respuestaModelo.status = 200;
      respuestaModelo.mensaje = "El movimiento se registró correctamente.";
      respuestaModelo.icono="success";
      return res.status(200).send(respuestaModelo);
    
    }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al guardar el movimiento";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
    });
});

router.put('/',validarToken, function (req, res) {
  var movimiento = req.body;
  movimiento.fechaModificacion = new Date();
  movimientoEmpleadosModelo.ActualizarPorID(movimiento, function () {
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Movimiento guardado con éxito";
    respuestaModelo.icono="success";
    return res.status(200).send(respuestaModelo);
  }, function () {
    respuestaModelo.status = 501;
    respuestaModelo.mensaje = "Ocurrió un error al guardar el movimiento";
    respuestaModelo.icono="error";
    return res.status(501).send(respuestaModelo);
  });
})

router.delete('/:id/:usuarioModificacionId',validarToken, function (req, res) {
  var movimiento = req.params;
  movimiento.FechaModificacion = new Date();
  movimientoEmpleadosModelo.DesactivarPorID(movimiento, function (respuesta) {
    if (!respuesta) {
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "No se encontró el movimiento.";
      respuestaModelo.icono="warning";
      return res.status(404).send(respuestaModelo);
    }
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Se actualizó correctamente la información del movimiento.";
    respuestaModelo.icono="success";
    return res.status(200).send(respuestaModelo);
  }, function () {
    respuestaModelo.status = 501;
    respuestaModelo.mensaje = "Ocurrió un error al eliminar el movimiento";
    respuestaModelo.icono="error";
    return res.status(501).send(respuestaModelo);
  });
})


module.exports = router;