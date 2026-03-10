import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import citaRoutes from './routes/citaRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes); // Punto 1: Login
app.use('/api/citas', citaRoutes); // Puntos 3, 4, 5

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor de ReservaTuEstilo corriendo en puerto ${PORT}`);
});