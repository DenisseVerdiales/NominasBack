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
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al consultar los empleado. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
  });
});

router.get('/empleadoId', validarToken, function (req, res) {
  empleadosModelo.ObtenerPorId(req.query.id, function (empleado) {
    if (empleado)
      return res.status(200).send(empleado);
    else{
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "No se encontró el empleado";
      respuestaModelo.icono="warning"
      return res.status(404).send(respuestaModelo);
    }
  }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al consultar el empleado. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
  });
});

router.get('/siguienteId', validarToken, function (req, res) {
  empleadosModelo.ObtenerSiguienteID(function (empleado) {
    if (empleado)
      return res.status(200).send(empleado);
    else{
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "Id no encontrado";
      respuestaModelo.icono="warning"
      return res.status(404).send(respuestaModelo);
    }
  }, function () {
    respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al consultar el siguiente no. empleado. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
  });
});

router.get('/reporte', validarToken, function (req, res) {
  empleadosModelo.ObtenerPorId(req.query.pIdEmpleado, async function (empleado) {
    console.log("RESPUESTA",empleado)
    if (empleado){
      let sp = `CALL reporteEmpleado(${req.query.pIdEmpleado}, ${req.query.pMes});`
      let reporte = await bd.query(sp, {})
      if (reporte)
        return res.status(200).send(reporte);
      else{
        respuestaModelo.status = 400;
        respuestaModelo.mensaje = "No se pude generar el reporte";
        respuestaModelo.icono="warning"
        return res.status(400).send(respuestaModelo);
      }
    }
    else{
      console.log("LLEGO AL ELSE")
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "El empleado ingresado no esta activo.";
      respuestaModelo.icono="warning";
      return res.status(404).send(respuestaModelo);
    }
  }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al consultar el empleado. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
  });
  }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al generar el reporte. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
  });


router.post('/', validarToken ,function (req, res) {
    var empleado = req.body;
    empleado.activo= true;
    empleado.fechaCreacion = new Date();
    empleadosModelo.Crear(empleado, function (nuevo) {
      if (!nuevo) {
        respuestaModelo.status = 400;
        respuestaModelo.mensaje = "El empleado ingresado ya existe.";
        respuestaModelo.icono="warning";
        return res.status(400).send(respuestaModelo);
      }
      respuestaModelo.status = 200;
      respuestaModelo.mensaje = "Empleado guardado con éxito.";
      respuestaModelo.icono="success";
      return res.status(200).send(respuestaModelo);
    
    }, function (error) {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al guardar el empleado. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
    });
});

router.put('/',validarToken, function (req, res) {
  var empleado = req.body;
  empleado.fechaModificacion = new Date();
  empleadosModelo.ActualizarPorID(empleado, function (empleado) {
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Empleado guardado con éxito.";
    respuestaModelo.icono="success";
    return res.status(200).send(respuestaModelo);
  }, function () {
    respuestaModelo.status = 501;
    respuestaModelo.mensaje = "Ocurrió un error al guardar el empleado. Intente más tarde.";
    respuestaModelo.icono="error";
    return res.status(501).send(respuestaModelo);
  });
})

router.delete('/:id/:usuarioModificacionId',validarToken, function (req, res) {
  var empleado = req.params;
  empleado.FechaModificacion = new Date();
  empleadosModelo.DesactivarPorID(empleado, function (respuesta) {
    if (!respuesta) {
      respuestaModelo.status = 404;
      respuestaModelo.mensaje = "No se encontró el empleado.";
      respuestaModelo.icono="warning";
      return res.status(404).send(respuestaModelo);
    }
    respuestaModelo.status = 200;
    respuestaModelo.mensaje = "Empleado eliminado con éxito.";
    respuestaModelo.icono="success";
    return res.status(200).send(respuestaModelo);
  }, function () {
      respuestaModelo.status = 501;
      respuestaModelo.mensaje = "Ocurrió un error al eliminar el empleado. Intente más tarde.";
      respuestaModelo.icono="error";
      return res.status(501).send(respuestaModelo);
  });
})

  module.exports = router;