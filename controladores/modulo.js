'use strict';
var app = require('express');
var router = app.Router();

var validarToken = require('../utilidades/verificarToken');
var modulosModelo = require('./../modelos/modulo-modelo');

router.post('/',validarToken, function(req, res){
  var modulo = req.body;
  modulo.FechaRegistro = new Date();
  modulosModelo.Crear(modulo, function(moduloBd){
      return res.status(200).send(moduloBd);
  }, function(error){
    return res.status(501).send(error);
  });
});

router.get('/',validarToken, function(req, res){
  modulosModelo.ObtenerActivos(function(modulo){
    return res.status(200).send(modulo);
  }, function(error){
    return res.status(404).send(error);
  });
});

router.get('/:id', function(req, res){
  modulosModelo.ObtenerPorId(req.params.id, function(modulo){
    if (modulo)
      return res.status(200).send(modulo);
    else
      return res.status(404).send();
  }, function(error){
    return res.status(501).send(error);
  });
});

router.put('/', function(req, res){
  var modulo = req.body;
  modulo.FechaModificacion = new Date();
  modulosModelo.ModificarPorID(modulo, function(modulo){
    return res.status(200).send();
  }, function(error){
    return res.status(501).send(error);
  });
})


router.delete('/:id/:usuarioModificacionId', function(req, res){
  var modulo = req.params;
  modulo.FechaModificacion = new Date();
  modulosModelo.DesactivarPorID(modulo, function(registros){
    return res.status(200).send();
  }, function(error){
    return res.status(501).send(error);
  });
})

module.exports = router;