'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoSchema = Schema(
    {
      patente:{
        type:String,
        unique:true
      },
      marca:String,
      modelo:String,
      persona: [{ type: Schema.ObjectId, ref: "personas" }]
      

    })

module.exports = mongoose.model('autos',AutoSchema)    