'use strict'
const controladores = require('../controladores');
const rutas = this;
 
rutas.RutaPrincipal = '/api';

rutas.Rutas = [
{ ruta: '/sesiones',  controlador: controladores.sesiones},
{ ruta: '/usuarios', controlador: controladores.usuarios},
{ ruta: '/empleados', controlador: controladores.empleados},
{ ruta: '/tipoEmpleado', controlador: controladores.tipoEmpleado},
{ ruta: '/jornadaLaboral', controlador: controladores.jornadaLaboral},
{ ruta: '/rol', controlador: controladores.rol},
{ ruta: '/movimientos', controlador: controladores.movimientos},
{ ruta: '/tipoBono', controlador: controladores.tipoBono},
];

module.exports = rutas;;

 