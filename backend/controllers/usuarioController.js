'use strict'
const bcrypt = require('bcrypt-nodejs')
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Usuario = require('../modelos/usuario.js');
const servicio = require('../servicios/index')

function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let User = new Usuario();

    User.nombre = req.body.usuario;
    User.mail = req.body.mail;
    User.pass = req.body.pass;
    User.activo = req.body.activo;


    User.save((err, usuariorstore) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ "mensaje": "creado correctamente", 'usuario': usuariorstore })

    })
}



/*
function validar(req, res) {


    var password = req.body.pass;


    Usuario.findOne({'mail': req.body.mail}, (err, user) => {
        if (err) return res.status(500).send({ mensaje: 'error al realizar la peticion' })
        if (!user) return res.status(401).send({ mensaje: 'Error usuario no existe' })


        bcrypt.compare(password, user.pass, function(error, isMatch) {
            if (error) {
                res.status(500).send(`Error al validar usuario> ${error}`)
            } else if (!isMatch) {
                res.status(401).send({ 'mensaje':'incorrecto'})
            } else {
                res.status(200).send({ 'mensaje':'correcto','token':servicio.createToken(user)})

            }
          })
    })

 


}*/

//validar nuevo
const validar = async (req, res) => {


    var password = req.body.pass;
    const email = req.body.mail

    const user = await Usuario.findOne({mail: email});

    if (!user) return res.status(401).send({ mensaje: 'Error usuario no existe' })
    if(!user.activo) return res.status(401).send({ mensaje: 'Usuario inactivo', estado:false })    
    user._id
    bcrypt.compare(password, user.pass, function(error, isMatch) {
            if (error) {
                res.status(500).send(`Error al validar usuario> ${error}`)
            } else if (!isMatch) {
                res.status(401).send({ 'mensaje':'incorrecto', estado:false})
            } else { 
              
                const token =servicio.createToken(user)
               
                res.status(200).send({ 'mensaje':'correcto','token':token, estado:true})

            }
    });
}





function todos(req, res) {
    Usuario.find({}, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
        if (!usuario) return res.status(404).send({ message: 'Error la persona no existe' })

        res.status(200).send({ usuario })
    })

}





/*const validaVigenciaUsuario = (req,res) =>{


    Usuario.findById(req.user, function (err, usuario) {
        if (err) return res.status(401).send({'mensaje':'usuario no autorizado'})

        return  res.status(200).send({'usuario':usuario.mail});
    });
 
}*/
const validaVigenciaUsuario = (req,res) =>{


    Usuario.findById(req.user, function (err, usuario) {
        if (err) return res.status(401).send({'mensaje':'usuario no autorizado'})

        return  res.status(200).send({'usuario':usuario.mail, 'activo':usuario.activo});
    });
 
}

//buscar usuario por id
const findbyId = (req,res) =>{

    
    Usuario.findById({_id:req.params.id}, function (err, usuario) {
        if (err) {
            console.log(err)
            return res.status(401).send({'mensaje':'usuario no autorizado'})}
        
        return  res.status(200).send({'usuario':usuario});
    });
 
}

//activar usuario 
const activar = async (req, res)=>{
    const {id} = req.params;   
    const  usuario =  await Usuario.findByIdAndUpdate( id, {activo:true},(err, docs)=>{
        if(err){
            console.log(" El error es: "+err);
        }else{
            console.log("Updated User : ", docs);
        }
    });
    
    res.status(400).json({
        msg:"usuario activado",
        usuario 
    });
}

//desactivar usuario 
const desactivar = async (req, res)=>{
    const {id} = req.params;  
    console.log(id) 
    const  usuario =  await Usuario.findByIdAndUpdate( id,{activo:false}, (err, docs)=>{
        if(err){
            console.log(" El error es: "+err);
        }else{
            console.log("Updated User : ", docs);
        }
    }); 
    res.status(400).json({
        msg:"usuario desactivado",
        usuario
    });
}





module.exports = {
    guardar,
    todos,
    validar,
    validaVigenciaUsuario,
    activar,
    desactivar,
    findbyId,


};
