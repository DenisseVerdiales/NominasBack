'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');

const TipoBono = sequelize.define('TipoBono', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nombreBono: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        defaultValue:''
      },
      activo: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      fechaCreacion: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      usuarioCreacionId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      fechaModificacion: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      },
      usuarioModificacionId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      }
  });
  module.exports = TipoBono;