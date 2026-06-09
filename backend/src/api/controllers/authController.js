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

    const nuevoUsuario = new Usuario({nombre, correo, contraseña: hashedContraseña})
    await nuevoUsuario.save()

    const token = jwt.sign ({id: nuevoUsuario._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.status(201).json({ message: 'Usuario registrado exitosamente',
      token : token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
      },
     })

  }
  catch (error){
    res.status(500).json({message: 'Error en el servidor'})
  }

}

const login = async (req, res) => {
  try {
    const {correo, contraseña}= req.body
    const usuario= await Usuario.findOne({correo}).select('+contraseña')
    if (!usuario){
      return res.status(401).json({ message: 'Datos inválidos' })
    }

    const isMatch = await bcrypt.compare( contraseña, usuario.contraseña)
    if (!isMatch){
      return res.status(401).json({ message: 'Datos inválidos' })
    }

    const token= jwt.sign({id: usuario._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.status (200).json({ message: 'Inicio de sesión exitoso',
      token: token, 
      usuario: {
        id:usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      }
    })


  } catch (error){
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

module.exports = {register, login}