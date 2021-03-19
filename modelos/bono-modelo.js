'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const usuarioModelo = require('../modelos/usuarios-modelo');
const tipoBonoModelo = require('../modelos/tipoBono-modelo');

const operadores = Sequelize.Op;

const bono = sequelize.define('Bono', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      importe: Sequelize.DECIMAL,
      tipoBonoId: Sequelize.INTEGER,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.INTEGER,
      fechaModificacion: Sequelize.DATE,
      usuarioModificacionId: Sequelize.INTEGER,
    },{
      timestamps: false,
      freezeTableName: true
    });

    bono.belongsTo(tipoBonoModelo, {
      as: "TipoBono",
      foreignKey: { fieldName: "tipoBonoId" },
    });

    bono.belongsTo(usuarioModelo, {
      as: "Usuarios",
      foreignKey: { fieldName: "usuarioCreacionId" },
    });

    bono.ObtenerPorTipoBonoId = function (tipoBono, exito, error) {
      bono
        .findOne({
          where: {
            activo: true ,
            [operadores.and]: [
              { tipoBonoId: tipoBono },
            ],
          },
        })
        .then(exito, error);
    };

  module.exports = bono;