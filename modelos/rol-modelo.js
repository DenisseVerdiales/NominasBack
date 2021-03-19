'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const usuariosModelo = require('./usuarios-modelo');

const rol = sequelize.define('Rol', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      nombreRol: Sequelize.STRING,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.INTEGER,
      fechaModificacion: Sequelize.DATE,
      usuarioModificacionId: Sequelize.INTEGER,
  },{
    timestamps: false,
    freezeTableName: true
  });

  rol.belongsTo(usuariosModelo, {
    as: "Usuarios",
    foreignKey: { fieldName: "usuarioCreacionId" },
  });
  
  rol.ObtenerActivos = function (exito, error) {
    rol
    .findAll({
      where: {
        activo: true
      },
    })
    .then(exito, error);
  };
  

  module.exports = rol;