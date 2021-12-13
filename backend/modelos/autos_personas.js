'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Auto_personasSchema = Schema(
    {
    auto: { type: Schema.ObjectId, ref: "autos" },     
    persona: { type: Schema.ObjectId, ref: "personas" } 

    })

module.exports = mongoose.model('autos_personas',Auto_personasSchema)    