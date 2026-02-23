import db from '../config/db.js';

const UserModel = {
    // 1. Verificar si el usuario ya existe (Requisito Punto A)
    // Se usa para evitar duplicados en el registro
    findByEmail: async (correo) => {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM usuarios WHERE correo = ?', 
                [correo]
            );
            return rows[0]; // Retorna el usuario si existe, o undefined si no
        } catch (error) {
            throw new Error('Error al buscar usuario: ' + error.message);
        }
    },

    // 2. Crear usuario nuevo (Requisito Punto A)
    // Aquí recibimos la contraseña ya hasheada desde el controlador
    create: async (datosUsuario) => {
        const { nombre, correo, contrasena, direccion, telefono, rol } = datosUsuario;
        try {
            const [result] = await db.execute(
                'INSERT INTO usuarios (nombre, correo, contrasena, direccion, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, correo, contrasena, direccion, telefono, rol || 'cliente']
            );
            return result.insertId; // Retorna el ID del nuevo usuario
        } catch (error) {
            throw new Error('Error al crear usuario en DB: ' + error.message);
        }
    },

    // 3. Obtener perfil por ID (Para la Ruta Protegida Punto C)
    // El token tendrá el ID, y con esto sacamos sus datos
    findById: async (id) => {
        try {
            const [rows] = await db.execute(
                'SELECT id_usuario, nombre, correo, rol FROM usuarios WHERE id_usuario = ?', 
                [id]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error al obtener perfil: ' + error.message);
        }
    }
};

export default UserModel;