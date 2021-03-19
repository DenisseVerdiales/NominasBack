'use strict';
var sequelize = require('./../bdconfig');
var Sequelize = require('sequelize');

const operadores = Sequelize.Op;

var modulos = sequelize.define('Modulo', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Descripcion: Sequelize.STRING,
  Orden: Sequelize.SMALLINT,
  Icono: Sequelize.STRING,
  Ruta: Sequelize.STRING,
  ModuloPadreID: Sequelize.BIGINT,
  TipoModulo: Sequelize.INTEGER,
  Activo: Sequelize.BOOLEAN,
  FechaRegistro: Sequelize.DATE,
  UsuarioRegistroID: Sequelize.INTEGER,
  FechaModificacion: Sequelize.DATE,
  UsuarioModificacionID: Sequelize.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true,
    setterMethods: {
      ModulosHijos: function(hijos){
        this.setDataValue('ModulosHijos', hijos);
      },
      Asignado: function(asignado){
        this.setDataValue('Asignado', asignado);
      }
   }
  }
);

modulos.hasMany(modulos, { as: 'ModulosHijos', sourceKey: 'ID', foreignKey: 'ModuloPadreID' });

// //metodo que obtiene todos los modulos
// modulos.ObtenerActivos = function(exito, error)
// {
//   modulos.findAll({ where: {Activo : { [operadores.eq] : true}}})
//   .then(function(modulos) {
//       exito(modulos);
//   }, function(err){console.log(err);
//       error(err);
//   });
// };

/**
* Función para consultar todos los modulos activos
* @returns {Modulos} Modulos
*/modulos.ObtenerActivos = function(exito, error)
{
  modulos.findAll(
    {
      where: {
        Activo: { [operadores.eq]: true },
        ModuloPadreID: { [operadores.eq]: null }
      }, include: [
        {
          model: modulos,
          required: false,
          as: 'ModulosHijos'
        }
      ]
    })
    .then(function (modulos) {
      exito(modulos);
    }, function (err) {
      console.log(err);
      error(err);
    });
};

//Metodo que obtiene usuario por ModuloID
modulos.ObtenerPorId = function(Id, exito, error)
{
  modulos.findOne({ where: { ID : { [operadores.eq]:  Id } } })
  .then(function(modulos){
    exito(modulos);
  }, function(err){
    error(err);
  });
}

//Metodo que obtiene todos los modulos que son operadores
modulos.ObtenerPadres = function(exito, error){
  modulos.findAll({ where: { ModuloPadreID: { [operadores.eq]: null } }})
  .then(function(modulos) {
      exito(modulos);
  }, function(err){
      error(err);
  });
}

module.exports = modulos;