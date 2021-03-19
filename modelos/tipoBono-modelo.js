'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const usuarioModelo = require('../modelos/usuarios-modelo');
const operadores = Sequelize.Op;

const tipoBono = sequelize.define('TipoBono', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      nombreBono: Sequelize.STRING,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.INTEGER,
      fechaModificacion: Sequelize.INTEGER,
      usuarioModificacionId: Sequelize.INTEGER,
  },{
    timestamps: false,
    freezeTableName: true
  });

  tipoBono.belongsTo(usuarioModelo, {
    as: "Usuarios",
    foreignKey: { fieldName: "usuarioCreacionId" },
  });

  tipoBono.ObtenerPorTipoBono = function (tipoBonoNombre, exito, error) {
    tipoBono
      .findOne({
        where: {
          activo: true ,
          [operadores.and]: [
            { nombreBono: tipoBonoNombre },
          ],
        },
      })
      .then(exito, error);
  };

  module.exports = tipoBono;