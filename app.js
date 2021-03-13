
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const rout = require('./router')(app);
const router = express.Router();

const cron = require('node-cron');
const cors = require('cors'); 

app.use(express.static('public'));

app.listen(port, function () {
  console.log('Servicio iniciado; Puerto: ' + port + ' Env: ' + process.env.NODE_ENV);
});

cors();
