'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const usuariosModelo = require('./usuarios-modelo');

const jornadaLaboral = sequelize.define('JornadaLaboral', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      horasLaborales: Sequelize.INTEGER,
      sueldoBase: Sequelize.DECIMAL,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.INTEGER,
      fechaModificacion: Sequelize.DATE,
      usuarioModificacionId: Sequelize.INTEGER,
  },{
    timestamps: false,
    freezeTableName: true
  });

jornadaLaboral.belongsTo(usuariosModelo, {
  as: "Usuarios",
  foreignKey: { fieldName: "usuarioCreacionId" },
});

jornadaLaboral.ObtenerActivos = function (exito, error) {
  jornadaLaboral
  .findAll({
    where: {
      activo: true
    },
  })
  .then(exito, error);
};

module.exports = jornadaLaboral;