const express = require("express");

const router = express.Router();

const controller = require("../controllers/reservacion.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const ROLES = require("../constants/roles");

router.post(
    "/",
    authenticate,
    authorize(ROLES.CLIENTE),
    controller.crear
);

router.get(
    "/mis",
    authenticate,
    authorize(ROLES.CLIENTE),
    controller.misReservaciones
);

router.get(
    "/",
    authenticate,
    authorize(ROLES.ADMIN),
    controller.todas
);

router.put(
    "/:id/estado",
    authenticate,
    authorize(ROLES.ADMIN),
    controller.actualizarEstado
);

router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.CLIENTE),
    controller.cancelar
);

module.exports = router;