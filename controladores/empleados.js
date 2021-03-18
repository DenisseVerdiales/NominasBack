'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const empleadosModelo = require('./../modelos/empleado-modelo');
const respuestaModelo = require('./../modelos/respuesta-modelo');
const bd = require('../bdconfig');


router.get('/', validarToken,function (req, res) {
  empleadosModelo.ObtenerActivos(function (empleado) {
    return res.status(200).send(empleado);
  }, function (error) {
    return res.status(404).send(error);
  });
});

router.get('/empleadoId', validarToken, function (req, res) {
  empleadosModelo.ObtenerPorIdReporte(req.query.id, function (empleado) {
    if (empleado)
      return res.status(200).send(empleado);
    else
      return res.status(404).send();
  }, function (error) {
    return res.status(501).send(error);
  });
});

router.get('/siguienteId', validarToken, function (req, res) {
  empleadosModelo.ObtenerSiguienteID(function (empleado) {
    if (empleado)
      return res.status(200).send(empleado);
    else
      return res.status(404).send();
  }, function (error) {
    return res.status(501).send(error);
  });
});

router.get('/reporte', validarToken, async function (req, res) {
    let sp = `CALL reporteEmpleado(${req.query.pIdEmpleado}, ${req.query.pMes});`
    let reporte = await bd.query(sp, {})
    if (reporte)
      return res.status(200).send(reporte);
    else
      return res.status(404).send();
  }, function (error) {
    return res.status(501).send(error);
  });


router.post('/', validarToken ,function (req, res) {
    var empleado = req.body;
    empleado.activo= true;
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

router.put('/',validarToken, function (req, res) {
  var empleado = req.body;
  empleado.fechaModificacion = new Date();
  empleadosModelo.ActualizarPorID(empleado, function (empleado) {
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Se actualizó correctamente la información del empleado.";
    return res.status(200).send(respuestaModelo);
  }, function (error) {
    return res.status(501).send(error);
  });
})

router.delete('/:id/:usuarioModificacionId',validarToken, function (req, res) {
  var empleado = req.params;
  empleado.FechaModificacion = new Date();
  empleadosModelo.DesactivarPorID(empleado, function (respuesta) {
    if (!respuesta) {
      return res.status(404).send("No se encontró el empleado.");
    }
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Se actualizó correctamente la información del empleado.";
    return res.status(200).send(respuestaModelo);
  }, function (error) {
    return res.status(501).send(error);
  });
})




  module.exports = router;