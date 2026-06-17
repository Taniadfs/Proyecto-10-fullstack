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