const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrarUsuario = async ({ nombre, correo, password }) => {

    const existe = await prisma.usuarios.findUnique({
        where: {
            correo
        }
    });

    if (existe) {
        throw new Error("El correo ya está registrado.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuarios.create({
        data: {
            nombre,
            correo,
            password: passwordHash
        }
    });

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
    };
};

const login = async ({ correo, password }) => {

    const usuario = await prisma.usuarios.findUnique({
        where: {
            correo
        }
    });

    if (!usuario) {
        throw new Error("Credenciales incorrectas.");
    }

    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
        throw new Error("Credenciales incorrectas.");
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    );

    return { token };
};

module.exports = {
    registrarUsuario,
    login
};