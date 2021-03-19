'use strict';

const app = require('express');
const router = app.Router();
const sesionesModelo = require('./../modelos/sesiones-modelo');
const usuariosModelo = require('./../modelos/usuarios-modelo');


router.post('/iniciar', function (req, res) {
    const usuario = req.body;
    usuariosModelo.ObtenerPorNombreContrasena(usuario, async function (usuarioBd) {
      if (usuarioBd !== null) {
        if (usuario.contrasena == usuarioBd.contrasena) {
          var sesion = sesionesModelo.CrearObjetoSesion(usuarioBd);
            sesionesModelo.GuardarSesion(sesion, function (sesionBd) {
              if (sesionBd !== null) {
                usuarioBd.dataValues.token = sesionBd.token;
                return res.status(200).send(usuarioBd);
              }
            }, function (error) {
              res.status(501).send(error);
            });
        } else {
          return res.status(401).send("Contraseña incorrecta");
        }
      } else {
        return res.status(404).send("Usuario no encontrado");
      }
    }, function (error) {
      return res.status(501).send(error);
    });
});


router.post('/salir', function (req, res) {
  sesionesModelo.CerrarSesion(req.body.token, req.body.id, function () {
      return res.status(200).send();
  }, function (error) {
      return res.status(501).send(error);
  });

});

router.get('/:token', function (req, res) {
  sesionesModelo.ObtenerPorToken(req.params.token, function (token) {
    if (token)
      return res.status(200).send(token);
    else
      return res.status(404).send("La sesión a caducado");
  }, function (error) {
    return res.status(501).send(error);
  });
});

module.exports = router;