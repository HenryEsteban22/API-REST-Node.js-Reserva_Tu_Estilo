import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// 1. OBTENER USUARIOS (Leer)
export const obtenerUsuarios = async (req, res) => {
    try {
        const [results] = await db.execute('SELECT id_usuario, nombre, correo, rol, direccion, telefono FROM usuarios');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. REGISTRO DE USUARIO (Crear) - Requisito Punto A
export const crearUsuario = async (req, res) => {
    const { nombre, correo, contrasena, direccion, telefono, rol } = req.body;
    try {
        // Validar si el usuario ya existe
        const [existe] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (existe.length > 0) return res.status(400).json({ message: "El correo ya está registrado" });

        // Hashear contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const contrasenaHasheada = await bcrypt.hash(contrasena, salt);

        const query = 'INSERT INTO usuarios (nombre, correo, contrasena, direccion, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)';
        await db.execute(query, [nombre, correo, contrasenaHasheada, direccion, telefono, rol || 'cliente']);
        
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. LOGIN DE USUARIO - Requisito Punto B
export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Validar credenciales
        const [results] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (results.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const usuario = results[0];

        // Comparar contraseña hasheada
        const coinciden = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!coinciden) return res.status(401).json({ message: "Contraseña incorrecta" });

        // GENERAR TOKEN FIRMADO
        // Incluye: Identificador de usuario, Firma con clave secreta y Tiempo de expiración
        const token = jwt.sign(
            { id: usuario.id_usuario, rol: usuario.rol }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        // Retornar token al cliente
        res.status(200).json({ 
            message: "Login exitoso", 
            token,
            usuario: { id: usuario.id_usuario, nombre: usuario.nombre, correo: usuario.correo }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. ACTUALIZAR USUARIO (Update)
export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    try {
        const query = 'UPDATE usuarios SET nombre = ?, direccion = ?, telefono = ? WHERE id_usuario = ?';
        await db.execute(query, [nombre, direccion, telefono, id]);
        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. ELIMINAR USUARIO (Delete)
export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};