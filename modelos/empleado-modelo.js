'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');
const tipoEmpleadoModelo = require('./tipoEmpleado-modelo');
const rolModelo = require('./rol-modelo');
const jornadaLaboralModelo = require('./jornadaLaboral-modelo');
const usuariosModelo = require('./usuarios-modelo');

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

module.exports = empleados;