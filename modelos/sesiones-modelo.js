'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');

const moment = require("moment");
const crypto = require('crypto');

const operadores = Sequelize.Op;


const sesiones = sequelize.define('Sesion', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: Sequelize.STRING,
  activo: Sequelize.BOOLEAN,
  fechaCreacion: Sequelize.DATE,
  usuarioCreacionId: Sequelize.INTEGER,
  fechaModificacion: Sequelize.DATE,
  usuarioModificacionId: Sequelize.INTEGER
},{
  timestamps: false,
  freezeTableName: true
});

sesiones.GenerarToken = function (usuarioId) {
  var tiempoUnix = moment().unix().toString() + usuarioId;
  return crypto.createHash('md5').update(tiempoUnix).digest('hex');
}

sesiones.CrearObjetoSesion = function (usuario) {
  console.log("usuario",usuario);
  return {
    token: sesiones.GenerarToken(usuario.id),
    activo: true,
    fechaCreacion: new Date(),
    usuarioCreacionId: usuario.id
  };
}

sesiones.GuardarSesion = function (sesion, exito, error) {
  sesiones.findOrCreate({
    where: { usuarioCreacionId: sesion.usuarioCreacionId, activo: true },
    defaults: sesion
  })
    .spread((sesionBd) => {
      exito(sesionBd);
    }).catch(err => {
      error(err);
    })
}

sesiones.CerrarSesion = function (token, usuarioId, exito, error) {
  sesiones.update({ Activo: false, fechaModificacion: new Date(), usuarioModificacionId: usuarioId },
    { where: { token: { [operadores.eq]: token }, activo: true } }).spread((registros) => {
      exito(registros);
    }).catch(err => {
      error(err);
    })
}

sesiones.ObtenerPorToken = function (token, exito, error) {
  sesiones.findOne({
    where: {
      token: token,
      activo: true
    }
  }).then(exito, error);
}


module.exports = sesiones;