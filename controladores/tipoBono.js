'use strict';
const app = require('express');
const router = app.Router();

const validarToken = require('../utilidades/verificarToken');
const tipoBonoModelo = require('./../modelos/tipoBono-modelo');
const bonoModelo = require('./../modelos/bono-modelo');

router.get('/bono',validarToken, function (req, res) {
tipoBonoModelo.ObtenerPorTipoBono(req.query.tipoBono, function (tipoBono) {
    if (tipoBono){
        bonoModelo.ObtenerPorTipoBonoId(tipoBono.id, function (bono) {
            if(bono){
                return res.status(200).send(bono);
            }else{
                return res.status(404).send();
            }

        },function (error) {
            return res.status(501).send(error);
        });
    }
    else{
        return res.status(404).send();
    }
  
}, function (error) {
    return res.status(501).send(error);
});
});

module.exports = router;