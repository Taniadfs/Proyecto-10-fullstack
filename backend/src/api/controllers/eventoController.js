const express = require ('express')
const router=express.Router()
const authenticate = require('../middlewares/authenticate')

const {
  getEventos,
  getEventosById,
  createEvento,
  updateEvento,
  deleteEvento,
  addAsistente

} = require ('../controllers/eventoController')

router.get('/', getEventos)
router.get('/:id', getEventosById)
router.post('/',authenticate, createEvento)
router.put('/:id',authenticate, updateEvento)
router.put( '/:idEvento/:idUsuario', authenticate, addAsistente)
router.delete('/:id',authenticate, deleteEvento)


module.exports=router