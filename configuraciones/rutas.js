'use strict'
const controladores = require('../controladores');
const rutas = this;
 
rutas.RutaPrincipal = '/api';

rutas.Rutas = [
{ ruta: '/sesiones',  controlador: controladores.sesiones},
{ ruta: '/usuarios', controlador: controladores.usuarios},
{ ruta: '/empleados', controlador: controladores.empleados},
{ ruta: '/tipoEmpleado', controlador: controladores.tipoEmpleado},
];

module.exports = rutas;;

 