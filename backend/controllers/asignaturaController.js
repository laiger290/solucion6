'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Asignatura = require('../modelos/asignatura');


function guardar(req,res){


    console.log("Estoy aqui")

    let asignatura = new Asignatura()
    asignatura.codigo = req.body.codigo 
    asignatura.nombre = req.body.nombre
    asignatura.profesor = req.body.idProfesor

    asignatura.save((err, asignaturastore) => {

        res.status(200).send({ asignaturaRegistrada: asignaturastore })

    })

}
function listarSimple(req,res){
  Asignatura.find({}, (err, asignatura) => {
    if (!asignatura) return res.status(404).send({ message: 'Error asignatura no existe' })
    res.status(200).send({ asignatura })
})
}

function listar(req,res){
    Asignatura.find()
      .populate('profesor').exec((err, asignaturaconProfesor) => {
        res.status(200).send({ asignaturaconProfesor })
      })
  }



module.exports = {
    guardar,
    listarSimple,
    listar
};
