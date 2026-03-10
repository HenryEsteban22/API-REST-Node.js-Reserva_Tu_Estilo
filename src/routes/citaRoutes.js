import express from 'express';
const router = express.Router();
import * as citaController from '../controllers/citaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

router.get('/disponibles', verificarToken, citaController.obtenerDisponibilidad);
router.post('/agendar', verificarToken, citaController.agendarCita);
router.patch('/:id/confirmar', verificarToken, (req, res) => { 
    req.body.estado = 'confirmada'; 
    citaController.cambiarEstado(req, res); 
});
router.patch('/:id/cancelar', verificarToken, (req, res) => { 
    req.body.estado = 'cancelada'; 
    citaController.cambiarEstado(req, res); 
});

export default router;