const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get(
    "/perfil",
    authenticate,
    authController.perfil
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post("/login", authController.login);

module.exports = router;