'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const jornadaLaboralModel = require('./../modelos/jornadaLaboral-modelo');


router.get('/', function (req, res) {
    jornadaLaboralModel.ObtenerActivos(function (jornadaLaboral) {
      return res.status(200).send(jornadaLaboral);
    }, function (error) {
      console.log("error",error);
      return res.status(404).send(error);
    });
});




  module.exports = router;