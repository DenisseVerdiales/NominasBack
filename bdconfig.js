const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const env = process.env.NODE_ENV || 'development';
const config    = require('./configuraciones/servidoresbd.json')[env];

config.dialectModule = mysql2;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
  sequelize.authenticate().then(() => {
    if (!process.env.TEST) {
      console.log('Conexión a la base de datos establecida.');
    }
  })
  .catch(function (err) {
    console.log('No fue posible conectar a la base de datos:', config.host);
  });

module.exports = sequelize;







