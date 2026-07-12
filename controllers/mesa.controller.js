const mesaService = require("../services/mesa.service");

const getMesas = async (req, res) => {
    try {
        const mesas = await mesaService.obtenerMesas();
        res.json(mesas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const getMesa = async (req, res) => {
    try {
        const mesa = await mesaService.obtenerMesaPorId(Number(req.params.id));

        if (!mesa)
            return res.status(404).json({
                mensaje: "Mesa no encontrada"
            });

        res.json(mesa);

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const postMesa = async (req, res) => {
    try {

        const mesa = await mesaService.crearMesa(req.body);

        res.status(201).json(mesa);

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const putMesa = async (req, res) => {

    try {

        const mesa = await mesaService.actualizarMesa(
            Number(req.params.id),
            req.body
        );

        res.json(mesa);

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

};

const deleteMesa = async (req, res) => {

    try {

        await mesaService.eliminarMesa(Number(req.params.id));

        res.json({
            mensaje: "Mesa desactivada"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    getMesas,
    getMesa,
    postMesa,
    putMesa,
    deleteMesa
};