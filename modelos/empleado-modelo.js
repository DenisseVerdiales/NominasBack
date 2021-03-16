'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const tipoEmpleadoModelo = require('./tipoEmpleado-modelo');
const rolModelo = require('./rol-modelo');
const jornadaLaboralModelo = require('./jornadaLaboral-modelo');
const usuariosModelo = require('./usuarios-modelo');
const operadores = Sequelize.Op;

const empleados = sequelize.define('Empleado', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      nombre: Sequelize.STRING,
      apellidoPaterno: Sequelize.STRING,
      apellidoMaterno: Sequelize.STRING,
      fechaNacimiento: Sequelize.DATE,
      domicilio: Sequelize.STRING,
      tipoEmpleadoId: Sequelize.INTEGER,
      rolId: Sequelize.INTEGER,
      jornadaLaboralId: Sequelize.INTEGER,
      activo: Sequelize.BOOLEAN,
      fechaCreacion: Sequelize.DATE,
      usuarioCreacionId: Sequelize.DataTypes.INTEGER,
      fechaModificacion: Sequelize.DATE,
      usuarioModificacionId: Sequelize.INTEGER
  },{
    timestamps: false,
    freezeTableName: true
  });

  empleados.belongsTo(tipoEmpleadoModelo, {
    as: "TipoEmpleado",
    foreignKey: { fieldName: "tipoEmpleadoId" },
  });
  empleados.belongsTo(rolModelo, {
    as: "Rol",
    foreignKey: { fieldName: "rolId" },
  });
  empleados.belongsTo(jornadaLaboralModelo, {
    as: "JornadaLaboral",
    foreignKey: { fieldName: "jornadaLaboralId" },
  });
  empleados.belongsTo(usuariosModelo, {
    as: "Usuarios",
    foreignKey: { fieldName: "usuarioCreacionId" },
  });



  empleados.Crear = function (empleado, exito, error) {
    empleados.create(empleado).then(exito, error);
  };

  empleados.ObtenerActivos = function (exito, error) {
    empleados
    .findAll({
      where: {
        activo: true
      },
      attributes: {
        include: [
          [
            Sequelize.fn(
              "CONCAT",
              Sequelize.col("nombre"),
              " ",
              Sequelize.col("apellidoPaterno"),
              " ",
              Sequelize.col("apellidoMaterno")
            ),
            "nombreEmpleado",
          ],
        ],
      },
      include: [
        {
          model: tipoEmpleadoModelo,
          as: "TipoEmpleado",
          required: true,
        },
        {
          model: rolModelo,
          as: "Rol",
          required: true,
        },
      ],
    })
    .then(exito, error);
  };

  empleados.ObtenerPorId = function (empleadoId, exito, error) {
    empleados
      .findOne({
        where: {
          activo: true ,
          [operadores.and]: [
            { id: empleadoId },
          ],
        },
      })
      .then(exito, error);
  };

  empleados.ActualizarPorID = function (empleado, exito, error) {
    empleados
      .update(empleado, { where: { id: empleado.id  } })
      .spread(exito)
      .catch(error);
  };

  empleados.DesactivarPorID = function (empleado, exito, error) {
    empleados
      .update(
        {
          activo: false,
          fechaModificacion: empleado.fechaModificacion,
          usuarioModificacionID: empleado.usuarioModificacionId,
        },
        { where: { id: empleado.id } }
      )
      .spread(exito)
      .catch(error);
  };

module.exports = empleados;