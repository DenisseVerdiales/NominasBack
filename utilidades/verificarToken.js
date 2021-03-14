const sesionesModelo = require('../modelos/Sesiones-modelo');

function VerificarToken(req, res, next){
  const apiToken = req.get("APITOKEN");
console.log("TOKEN",req.get("APITOKEN"));
  if (req.method === 'OPTIONS')
    return next();

  if (req.path === '/iniciar')
     return next();

  if (!apiToken)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  sesionesModelo.ObtenerPorToken(apiToken, function(token){
    req.datosSesion = token;
    next();
  }, function(){
	  return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
	});
}

module.exports = VerificarToken;
