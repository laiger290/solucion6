var Auto_personas = require('../modelos/autos_personas.js');

function guardarAuto_persona(req,res){

    let autopersona = new Auto_personas()
    autopersona.persona=req.body.idPersona
    autopersona.auto=req.body.idAuto 
    autopersona.save((err, autopersona) => {

        res.status(200).send({ registroInsertado: autopersona })

    })

  }

  function listar(req,res){
    Auto_personas.find()
     .populate('persona')
     .populate('auto')
      .exec((err, autosconpersona) => {
       res.status(200).send({ autosconpersona })
     })
 }

  module.exports = {
    guardarAuto_persona,
    listar
};
