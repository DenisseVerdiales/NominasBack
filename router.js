'use strict';
const lodash          = require('lodash');
const bodyParser      = require('body-parser');
const rutas           = require('./configuraciones/rutas');
const ValidarToken    = require('./utilidades/verificarToken');

module.exports = function(app)
{  
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  app.use(bodyParser.json({ limit: '5mb', extended: true }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


lodash.forEach(rutas.Rutas, function(index)
{
  app.use(rutas.RutaPrincipal + index.ruta, index.controlador);
});

}
