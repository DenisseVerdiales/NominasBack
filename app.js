
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const Http = require('http');
const express = require('express');
const app = express();
const rout = require('./router');
const router = express.Router();
const compression = require('compression');
const cors = require('cors'); 
app.use(compression());
app.use(cors());
app.use(express.static('public'));

const http = Http.createServer(app).listen(port, '0.0.0.0');
rout(app, http);
console.log(`Servicio iniciado; Env: ${process.env.NODE_ENV};`);

//app.listen(port, function () {
//  console.log('Servicio iniciado; Puerto: ' + port + ' Env: ' + process.env.NODE_ENV);
//});



