const mongoose = require('mongoose')
const eventoSchema= new mongoose.Schema({
 titulo:{
  type : String,
  required:[true,'El título es obligatorio'],
  trim : true},

  fecha: {
    type : Date,
    required: true ('La fecha es obligatoria')
  },

  lugar: {
    type : String,
    required: true ('El lugar es obligatorio'),
    trim : true
  },

    descripcion : {
      type : String,
      required: false,
      trim : true,
    },
  
    imagen : {
      type : String,
      required: false,
    },

    asistentes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
      }],
})

  const Evento= mongoose.model('Evento', eventoSchema)
  module.exports= Evento 


