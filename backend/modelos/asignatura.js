'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AsignaturaSchema = Schema(
    {
      codigo:String,
      nombre:String,
      profesor: { type: Schema.ObjectId, ref: "profesor" }

    })

module.exports = mongoose.model('asignatura',AsignaturaSchema)    