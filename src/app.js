import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';

const app = express();

// --- Middlewares Globales ---
app.use(cors()); // Permite que tu Frontend se conecte sin bloqueos
app.use(express.json()); // Permite recibir datos en formato JSON

// --- Rutas ---
// Definimos el prefijo /api/auth para todas tus rutas de usuario
app.use('/api/auth', authRoutes);

// Ruta de diagnóstico simple
app.get('/', (req, res) => {
    res.send('🚀 Servidor de Reservatuestilo funcionando');
});

// --- Manejo de errores 404 ---
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// --- Encender Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`🔐 JWT Secret cargado correctamente`);
});