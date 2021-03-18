'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const empleadoModelo = require('../modelos/empleado-modelo')
const rolModelo = require('../modelos/rol-modelo');
const usuarioModelo = require('../modelos/usuarios-modelo');
const operadores = Sequelize.Op;
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
      activo: true,
    },
    include:
    [
        {
          model: empleadoModelo,
          as: 'Empleado',
          attributes:
          [
              [Sequelize.fn('CONCAT', Sequelize.col('Empleado.nombre'), ' ', Sequelize.col('Empleado.apellidoPaterno'), ' ', Sequelize.col('Empleado.apellidoMaterno')), 'Nombre']
          ],
        
          required: true
        },
    ],order: [
      ['fechaMovimiento', 'ASC'],
  ]
  })
  .then(exito, error);
};

movimientoEmpleado.ObtenerActivoPorID = function (movimientoId, exito, error) {
  movimientoEmpleado
  .findOne({
    where: {
      activo: true,
      [operadores.and]: [
        { id: movimientoId},
      ],
    },
    include: [
      {
        model: empleadoModelo,
        as: "Empleado",
        required: true,
      },
    ],
  })
  .then(exito, error);
};

movimientoEmpleado.ObtenerActivoPorFecha = function (movimientoFecha, exito, error) {
  movimientoEmpleado
  .findAll({
    where: {
      activo: true,
      [operadores.and]: [
        { fechaMovimiento:  { [operadores.lt]: movimientoFecha }},
      ],
    },
    include:
    [
        {
          model: empleadoModelo,
          as: 'Empleado',
          attributes:
          [
              [Sequelize.fn('CONCAT', Sequelize.col('Empleado.nombre'), ' ', Sequelize.col('Empleado.apellidoPaterno'), ' ', Sequelize.col('Empleado.apellidoMaterno')), 'Nombre']
          ],
        
          required: true
        },
    ],order: [
      ['fechaMovimiento', 'ASC'],
  ]
  })
  .then(exito, error);
};

movimientoEmpleado.DesactivarPorID = function (movimiento, exito, error) {
  movimientoEmpleado
    .update(
      {
        activo: false,
        fechaModificacion: movimiento.fechaModificacion,
        usuarioModificacionID: movimiento.usuarioModificacionId,
      },
      { where: { empleadoId: movimiento.id } }
    )
    .spread(exito)
    .catch(error);
};


movimientoEmpleado.ActualizarPorID = function (movimiento, exito, error) {
  movimientoEmpleado
    .update(movimiento, { where: { id: movimiento.id  } })
    .spread(exito)
    .catch(error);
};


module.exports = movimientoEmpleado;