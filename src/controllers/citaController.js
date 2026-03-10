import * as citaService from '../services/citaService.js';

export const agendarCita = async (req, res) => {
    try {
        const nuevaCita = await citaService.crearReserva(req.body);
        res.status(201).json({ message: "Cita agendada con éxito", data: nuevaCita });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const cambiarEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        await citaService.actualizarEstado(id, estado);
        res.json({ message: `Cita ${estado} con éxito` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};