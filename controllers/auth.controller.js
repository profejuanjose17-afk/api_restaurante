const authService = require("../services/auth.service");

const register = async (req, res) => {

    try {

        const usuario = await authService.registrarUsuario(req.body);

        res.status(201).json(usuario);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }

};

const login = async (req, res) => {

    try {

        const token = await authService.login(req.body);

        res.json(token);

    } catch (error) {

        res.status(401).json({
            mensaje: error.message
        });

    }

};

const perfil = async (req, res) => {

    res.json(req.user);

};

module.exports = {
    register,
    login,
    perfil
};