import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    // Exigir token en header Authorization (Requisito Punto C)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    try {
        // Validar token con la firma secreta (Firma con clave secreta)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardar el identificador del usuario en la petición
        req.usuarioId = decoded.id; 
        
        next(); // Permitir el acceso a la ruta
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};