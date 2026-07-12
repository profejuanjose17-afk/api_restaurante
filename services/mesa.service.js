const prisma = require("../config/prisma");

const obtenerMesas = async () => {
    return await prisma.mesas.findMany();
};

const obtenerMesaPorId = async (id) => {
    return await prisma.mesas.findUnique({
        where: { id }
    });
};

const crearMesa = async (datos) => {
    return await prisma.mesas.create({
        data: datos
    });
};

const actualizarMesa = async (id, datos) => {
    return await prisma.mesas.update({
        where: { id },
        data: datos
    });
};

const eliminarMesa = async (id) => {
    return await prisma.mesas.update({
        where: { id },
        data: {
            disponible: false
        }
    });
};

module.exports = {
    obtenerMesas,
    obtenerMesaPorId,
    crearMesa,
    actualizarMesa,
    eliminarMesa
};