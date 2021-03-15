'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const rolModelo = require('./../modelos/rol-modelo');


router.get('/', validarToken,function (req, res) {
    rolModelo.ObtenerActivos(function (rol) {
      return res.status(200).send(rol);
    }, function (error) {
      return res.status(404).send(error);
    });
});





  module.exports = router;