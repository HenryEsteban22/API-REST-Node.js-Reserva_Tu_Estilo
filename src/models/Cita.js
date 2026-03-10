// Simulación de esquema para SQL (puedes adaptarlo al pool de conexión)
const Cita = {
    tabla: 'citas',
    campos: ['id', 'cliente_id', 'barbero_id', 'servicio_id', 'fecha', 'hora', 'estado'],
    estados: ['pendiente', 'confirmada', 'cancelada', 'finalizada']
};

module.exports = Cita;