'use strict';
const sequelize = require('./../bdconfig');
const Sequelize = require('sequelize');



const usuarios = sequelize.define('Usuarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreUsuario: Sequelize.STRING,
  contrasena:Sequelize.STRING,
  activo: Sequelize.BOOLEAN,
  fechaCreacion: Sequelize.DATE
},{
  timestamps: false,
  freezeTableName: true
}
);

usuarios.ObtenerPorNombreContrasena = function (usuario, exito, error) {
  console.log("usuario",usuario);
  usuarios.findOne({
    where: {
      nombreUsuario: usuario.nombreUsuario ,
      contrasena:  usuario.contrasena 
    }
  }).then(function (usuario) {
    exito(usuario);
  }, function (err) {
    console.log("err",err);
    error(err);
  });
}

usuarios.ObtenerTodos = function (exito, error) {
  usuarios.findAll({
  })
    .then(function (usuarios) {
      exito(usuarios);
    }, function (err) {
      error(err);
    });
};

module.exports = usuarios;