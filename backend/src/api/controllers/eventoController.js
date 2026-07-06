const Evento=require('../models/evento')

const getEventos=async (req,res)=>{
  try{
    const eventos= await Evento.find()
    res.status(200).json(eventos)
  }
  catch(error){
    res.status(500).json({message:'Error en el servidor'})
  }
}

const getEventosById=async(req,res)=>{
  try{
    const evento= await Evento.findById(req.params.id ) 
    if(!evento){
      return res.status(404).json({message:'Evento no encontrado'})
    }
    res.status(200).json(evento)

  }
  catch(error){
    res.status(500).json({message:'Error en el servidor'})
  }
}

const createEvento=async(req,res)=>{
  try{ 
    const {titulo, fecha, lugar, descripcion, imagen}= req.body
    if (titulo === undefined || fecha === undefined || lugar === undefined) {
      return res.status(400).json({message:'Faltan datos obligatorios'})
    }
    const eventoExistente= await Evento.findOne({titulo, fecha})
    if(eventoExistente){
     return res.status(409).json({message:'Ya existe un evento con el mismo titulo y fecha'})}


    const nuevoEvento= new Evento({titulo, fecha, lugar, descripcion, imagen})
    await nuevoEvento.save()
    
    res.status(201).json({message:'Evento creado exitosamente', evento:nuevoEvento})



  }

catch(error){
  
      res.status(500).json({message:'Error en el servidor'})
}}

const updateEvento=async(req,res)=>{
  try{
    const {titulo, fecha, lugar, descripcion, imagen}= req.body
    const evento= await Evento.findById(req.params.id)
    if(!evento){
      return res.status(404).json({message:'Evento no encontrado'})
    }
    evento.titulo=titulo || evento.titulo
    evento.fecha=fecha || evento.fecha
    evento.lugar=lugar || evento.lugar
    evento.descripcion=descripcion || evento.descripcion
    evento.imagen=imagen || evento.imagen

    await evento.save()
    res.status(200).json({message:'Evento actualizado exitosamente',evento})

  }
  catch(error){
    res.status(500).json({message:'Error en el servidor'})
  }
}
const deleteEvento=async(req,res)=>{
  try{
    const evento= await Evento.findByIdAndDelete(req.params.id)
    if(!evento){
      return res.status(404).json({message:'Evento no encontrado'})
    }
    
    res.status(200).json({message:'Evento eliminado exitosamente'})
  }
  catch(error){
    res.status(500).json({message:'Error en el servidor'})
  }
} 

const addAsistente=async(req,res)=>{
  try{
    const {idEvento, idUsuario}=req.params
    const evento= await Evento.findById(idEvento)
    if(!evento){
      return res.status(404).json({message:'Evento no encontrado'})
    }
    if (evento.asistentes.some(asistente => asistente.toString() === idUsuario)){
      
      return res.status(400).json({message:'El usuario ya es asistente del evento'})
    }
    evento.asistentes.push(idUsuario)
    await evento.save()
    res.status(200).json({message:'Asistente agregado exitosamente',evento})
  }
  catch(error){
    res.status(500).json({message:'Error en el servidor'})
  }
}

module.exports={getEventos,getEventosById,createEvento,updateEvento,deleteEvento,addAsistente}