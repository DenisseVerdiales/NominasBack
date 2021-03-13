'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');

const MovimientoEmpleado = sequelize.define('MovimientoEmpleado', {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      empleadoId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
      },
      cantidadEntregasRecorrido: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
      },
      tipoRolCubirtoId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue:0
      },
      fechaMovimiento: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      importeTotalRecorrido: {
        type: Sequelize.DataTypes.DECIMAL(10,0),
        allowNull: true,
        defaultValue:0.0
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
module.exports = MovimientoEmpleado;