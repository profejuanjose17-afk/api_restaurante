const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const ROLES = require("../constants/roles");

const router = express.Router();

const mesaController = require("../controllers/mesa.controller");

router.get("/", mesaController.getMesas);

router.get("/:id", mesaController.getMesa);

router.post(
    "/",
    authenticate,
    authorize(ROLES.ADMIN),
    mesaController.postMesa
);

router.put(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    mesaController.putMesa
);

router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    mesaController.deleteMesa
);

module.exports = router;