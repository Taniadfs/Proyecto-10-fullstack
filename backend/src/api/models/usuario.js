const mongoose = require ('mongoose')
const usuarioSchema = new mongoose.Schema (
  {
    nombre: {
      type : String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    correo: {
    type : String,
    required : [true, 'El correo es obligatorio'],
   unique : true,
   trim : true,
   match : [/^\S+@\S+\.\S+$/, 'El correo debe ser una dirección válida'],
 
    },
    contraseña: {
      type : String,
      required : [true, 'La contraseña es obligatoria'],
      trim : true,
      select : false,
    },
  }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports= Usuario