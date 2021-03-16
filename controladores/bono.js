'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const bonoModelo = require('./../modelos/bono-modelo');



module.exports = router;