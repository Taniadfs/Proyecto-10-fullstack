const Usuario= require('../models/usuario')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

const register = async(req, res) =>{
  try{ 
    const {nombre, correo, contraseña} = req.body
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    } 
    if (!contraseña || contraseña.length < 8){
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' })
    }
    if (!/^\S+@\S+\.\S+$/.test(correo)){
      return res.status(400).json({ message: 'El correo debe ser una dirección válida' })
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(contraseña)) {
      return res.status(400).json({
        message:
          'La contraseña debe tener una mayúscula, una minúscula y un número'
      })
    }

    const emailExiste = await Usuario.findOne({correo : correo})
    if (emailExiste) {
      return res.status(409).json({ message: 'El usuario ya existe' })
    }
    const hashedContraseña = await bcrypt.hash(contraseña, 10)



    const nuevoUsuario = new Usuario({nombre, correo, contraseña})
  }
  catch (error){
    res.status(500).json({message: 'Error en el servidor'})
  }
}