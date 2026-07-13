const prisma = require("../config/prisma");

const crearReservacion = async ({ fecha, hora, personas, mesa_id }, usuarioId) => {

    const existe = await prisma.reservaciones.findFirst({
        where: {
            mesa_id,
            fecha: new Date(fecha),
            hora: new Date(`1970-01-01T${hora}`),
            estado: {
                not: "cancelada"
            }
        }
    });

    if (existe) {
        throw new Error("La mesa ya está reservada para esa fecha y hora.");
    }

    return await prisma.reservaciones.create({
        data: {
            fecha: new Date(fecha),
            hora: new Date(`1970-01-01T${hora}`),
            personas,
            usuario_id: usuarioId,
            mesa_id
        }
    });

};

const obtenerMisReservaciones = async (usuarioId) => {

    return await prisma.reservaciones.findMany({
        where: {
            usuario_id: usuarioId
        },
        include: {
            mesas: true
        }
    });

};

const obtenerTodas = async () => {

    return await prisma.reservaciones.findMany({
        include: {
            usuarios: true,
            mesas: true
        }
    });

};

const cambiarEstado = async (id, estado) => {

    return await prisma.reservaciones.update({
        where: {
            id
        },
        data: {
            estado
        }
    });

};

const cancelarReservacion = async (id, usuarioId) => {

    const reservacion = await prisma.reservaciones.findUnique({
        where: {
            id
        }
    });

    if (!reservacion)
        throw new Error("Reservación no encontrada.");

    if (reservacion.usuario_id !== usuarioId)
        throw new Error("No puede cancelar esta reservación.");

    return await prisma.reservaciones.update({
        where: {
            id
        },
        data: {
            estado: "cancelada"
        }
    });

};

module.exports = {
    crearReservacion,
    obtenerMisReservaciones,
    obtenerTodas,
    cambiarEstado,
    cancelarReservacion
};