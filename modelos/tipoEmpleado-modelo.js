'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const usuariosModelo = require('./usuarios-modelo');

const tipoEmpleado = sequelize.define('TipoEmpleado', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      tipoEmpleado: Sequelize.DataTypes.STRING,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.INTEGER,
      fechaModificacion: Sequelize.DATE,
      usuarioModificacionId: Sequelize.INTEGER
  },{
    timestamps: false,
    freezeTableName: true
  });

  tipoEmpleado.belongsTo(usuariosModelo, {
    as: "Usuarios",
    foreignKey: { fieldName: "usuarioCreacionId" },
  });


  tipoEmpleado.ObtenerActivos = function (exito, error) {
    tipoEmpleado
    .findAll({
      where: {
        Activo: { [operadores.eq]: true },
      },
    })
    .then(exito, error);
};


  module.exports = tipoEmpleado;