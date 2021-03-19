'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');

const Configuraciones = sequelize.define('Configuraciones', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        defaultValue:''
      },
      porcentaje: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
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

module.exports = Configuraciones;