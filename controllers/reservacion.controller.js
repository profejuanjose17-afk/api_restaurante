const reservacionService = require("../services/reservacion.service");

const crear = async (req, res) => {
    try {

        const reservacion = await reservacionService.crearReservacion(
            req.body,
            req.user.id
        );

        res.status(201).json(reservacion);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }
};

const misReservaciones = async (req, res) => {

    const reservaciones = await reservacionService.obtenerMisReservaciones(req.user.id);

    res.json(reservaciones);

};

const todas = async (req, res) => {

    const reservaciones = await reservacionService.obtenerTodas();

    res.json(reservaciones);

};

const actualizarEstado = async (req, res) => {

    const reservacion = await reservacionService.cambiarEstado(
        Number(req.params.id),
        req.body.estado
    );

    res.json(reservacion);

};

const cancelar = async (req, res) => {

    const reservacion = await reservacionService.cancelarReservacion(
        Number(req.params.id),
        req.user.id
    );

    res.json(reservacion);

};

module.exports = {
    crear,
    misReservaciones,
    todas,
    actualizarEstado,
    cancelar
};