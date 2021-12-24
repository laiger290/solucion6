'use strict'
const axios = require('axios');
const servicio = require('../servicios/index')
const jwt = require('jwt-simple')
const moment = require('moment')
require('dotenv').config()

async function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion' })
    }

    const token = req.headers.authorization.split(" ")[1]


    try {

        var payload = jwt.decode(token, process.env.SECRET_TOKEN)
        console.log("payload 1")
       console.log(payload)



        //funcion retornar id
        

    try {
        const response = await axios.get(`http://localhost:5000/api/usuario/id/${payload.sub}`);
        
        if(response.data.usuario && response.data.usuario.activo == false ){


            const newtoken = servicio.createToken(response.data.usuario)
            payload = jwt.decode(newtoken, process.env.SECRET_TOKEN)
            
            
        if (payload.exp < moment().unix() || payload.at == false) {
            return res.status(401).send({ message: 'El token ha expirado' })
           // return res.redirect('/login')
         }
 
         req.user = payload.sub
        }
        

      } catch (error) {
        console.error(error);
      }




     
       
    //////////


      

        if (payload.exp < moment().unix()) {
           return res.status(401).send({ message: 'El token ha expirado' })
          // return res.redirect('/login')
        }

        req.user = payload.sub
    } catch (err) {
        return res.status(401).send({ message: 'El token no es valido' })
       // return res.redirect('http://localhost:3000/login')
    }


    next()

}


module.exports = {
    isAuth

};