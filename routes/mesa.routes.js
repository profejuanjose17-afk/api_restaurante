const express = require("express");

const router = express.Router();

const mesaController = require("../controllers/mesa.controller");

router.get("/", mesaController.getMesas);

router.get("/:id", mesaController.getMesa);

router.post("/", mesaController.postMesa);

router.put("/:id", mesaController.putMesa);

router.delete("/:id", mesaController.deleteMesa);

module.exports = router;