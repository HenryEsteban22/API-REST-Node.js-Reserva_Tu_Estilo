export const crearReserva = async (datos) => {
    // Aquí irá tu lógica de conexión a MySQL más adelante
    return { id: 1, ...datos, estado: 'pendiente' };
};

export const actualizarEstado = async (id, estado) => {
    // Lógica para el UPDATE en la base de datos
    return { id, estado };
};

export const consultarDisponibilidad = async (barberoId, fecha) => {
    return ["09:00", "10:00", "15:00"]; 
};