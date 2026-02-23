import { Router } from 'express';
import { 
    crearUsuario, 
    loginUsuario, 
    obtenerUsuarios, 
    actualizarUsuario, 
    eliminarUsuario 
} from '../controllers/authController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// --- RUTAS PÚBLICAS ---

// Registro de usuario (Punto A de la evidencia)
router.post('/register', crearUsuario);

// Login de usuario (Punto B de la evidencia)
router.post('/login', loginUsuario);


// --- RUTAS PROTEGIDAS (Requieren Token) ---

// Obtener perfil del usuario autenticado (Punto C de la evidencia)
// Esta ruta usa el middleware 'verificarToken' antes de llegar al controlador
router.get('/profile', verificarToken, (req, res) => {
    res.status(200).json({
        message: "Acceso concedido a ruta protegida",
        usuarioId: req.usuarioId // ID extraído del token firmado
    });
});

// CRUD Completo 
router.get('/usuarios', verificarToken, obtenerUsuarios);
router.put('/usuarios/:id', verificarToken, actualizarUsuario);
router.delete('/usuarios/:id', verificarToken, eliminarUsuario);

export default router;