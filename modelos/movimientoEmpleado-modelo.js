'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const empleadoModelo = require('../modelos/empleado-modelo')
const rolModelo = require('../modelos/rol-modelo');
const usuarioModelo = require('../modelos/usuarios-modelo');

const movimientoEmpleado = sequelize.define('MovimientoEmpleado', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      empleadoId: Sequelize.INTEGER,
      cantidadEntregasRecorrido: Sequelize.INTEGER,
      tipoRolCubirtoId: Sequelize.INTEGER,
      fechaMovimiento: Sequelize.DATE,
      importeTotalRecorrido: Sequelize.DECIMAL,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.INTEGER,
      fechaModificacion: Sequelize.DATE,
      usuarioModificacionId: Sequelize.INTEGER,
  },{
    timestamps: false,
    freezeTableName: true
  });


movimientoEmpleado.belongsTo(empleadoModelo, {
  as: "Empleado",
  foreignKey: { fieldName: "empleadoId" },
});
movimientoEmpleado.belongsTo(rolModelo, {
  as: "Rol",
  foreignKey: { fieldName: "tipoRolCubirtoId" },
});
movimientoEmpleado.belongsTo(usuarioModelo, {
  as: "Usuarios",
  foreignKey: { fieldName: "usuarioCreacionId" },
});

movimientoEmpleado.Crear = function (movimiento, exito, error) {
  movimientoEmpleado.create(movimiento).then(exito, error);
};

movimientoEmpleado.ObtenerActivos = function (exito, error) {
  movimientoEmpleado
  .findAll({
    where: {
      activo: true
    },
    include:
    [
        {
          model: empleadoModelo,
          as: 'Empleado',
          order: [
              ['nombre', 'ASC'],
          ],
          attributes:
          [
              [Sequelize.fn('CONCAT', Sequelize.col('Empleado.nombre'), ' ', Sequelize.col('Empleado.apellidoPaterno'), ' ', Sequelize.col('Empleado.apellidoMaterno')), 'Nombre']
          ],
        
          required: true
        },
    ]
  })
  .then(exito, error);
};

module.exports = movimientoEmpleado;