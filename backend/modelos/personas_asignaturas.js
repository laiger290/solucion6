'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Persona_AsignaturaSchema = Schema(
    {
    asignatura: { type: Schema.ObjectId, ref: "asignatura" },     
    persona: { type: Schema.ObjectId, ref: "personas" } 
      
    })

module.exports = mongoose.model('personas_asignatura',Persona_AsignaturaSchema)    