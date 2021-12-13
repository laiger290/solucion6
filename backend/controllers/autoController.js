'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Auto = require('../modelos/autos.js');


function guardar(req,res){


    console.log("Estoy aqui")

    let auto = new Auto()
    auto.patente = req.body.patente 
    auto.marca = req.body.marca
    auto.modelo = req.body.modelo 
    auto.persona = req.body.idPersona

    auto.save((err, autoguardado) => {

        res.status(200).send({ autoInsertado: autoguardado })

    })

}


function listar(req,res){
     Auto.find()
      .populate('persona').exec((err, autosconpersona) => {
        res.status(200).send({ autosconpersona })
      })
  }


module.exports = {
    guardar,
    listar
};
